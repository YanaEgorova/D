'use strict';
const downloadBtn = document.querySelector('.js-download-btn');
downloadBtn.addEventListener('click', downloadBtnAnimation);

function downloadBtnAnimation(e) {
  document.body.classList.add('animation');
  const btn = e.currentTarget;
  const btnWrap = btn.parentNode;
  let youtubeAnimationBlock;
  let counterAnimationBlock;
  [...btnWrap.children].forEach(el => {
    if (el.classList.contains('counter-animation')) {
      counterAnimationBlock = el;
    }
    if (el.classList.contains('youtube-animation')) {
      youtubeAnimationBlock = el;
    }
  })
  const div = document.createElement('div');
  let firstTm;
  let secondTm;

  div.classList.add('pulse');
  this.appendChild(div);
  const maxValue = Math.max(this.clientWidth, this.clientHeight);
  const position = this.getBoundingClientRect();
  const left = `${e.clientX - position.left - (maxValue / 2)}px`;
  const top = `${e.clientY - position.top - (maxValue / 2)}px`;
  div.style.width = `${maxValue}px`;
  div.style.height = `${maxValue}px`;
  div.style.left = left;
  div.style.top = top;

  const mainTm = setTimeout(() => {
    btn.classList.add('download-btn-hidden');
    firstTm = setTimeout(() => {
      youtubeAnimationBlock.classList.add('youtube-animation-animate');

      counterAnimationBlock.classList.add('counter-animation-animate');
      secondTm = setTimeout(() => {
        counterAnimationBlock.classList.remove('counter-animation-animate');
        youtubeAnimationBlock.classList.remove('youtube-animation-animate');
        btn.classList.remove('download-btn-hidden');
        document.body.classList.remove('animation');
        clearTimeout(secondTm);
        cross_download("../111.jpeg", "file.jpg");
      }, 6000)
      clearTimeout(firstTm)
    }, 500);
    clearTimeout(mainTm)
  }, 500)

}

// ==============================================================

function cross_download(url, fileName) {
  const req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.responseType = "blob";
  const __fileName = fileName;
  req.onload = function (event) {
    const blob = req.response;
    const contentType = req.getResponseHeader("content-type");
    if (window.navigator.msSaveOrOpenBlob) {
      // Internet Explorer
      window.navigator.msSaveOrOpenBlob(new Blob([blob], {
        type: contentType
      }), fileName);
    } else {
      const link = document.createElement('a');
      document.body.appendChild(link);
      link.download = __fileName;
      link.href = window.URL.createObjectURL(blob);
      link.click();
      document.body.removeChild(link); //remove the link when done
    }
  };
  req.send();
}