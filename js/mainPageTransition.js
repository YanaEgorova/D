'use strict';
import {
  mainAnimateDown
} from "./mainAnimationDown.js";
import {
  mainAnimateUp
} from "./mainAnimationUp.js";
import {
  setActiveMenuLink
} from "./menu.js";
import {
  closeProject
} from "./projects.js";
const main = document.getElementById('main');
const homeDownBtn = document.querySelector('.js-home__block-btn');
const downloadBtnIcon = document.querySelector('.js-downloadBtn-icon');
const helloBackBtn = document.querySelector('.js-hello-btn');
const body = document.body;
let IsIntersecting;
// set top section class
main.children[0].classList.add('top-section');
// set event listeners
helloBackBtn.addEventListener('click', backToHome);
window.addEventListener('keydown', handleKeyPressAnimation);
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchend', handleTouchMove, false);
homeDownBtn.addEventListener('click', () => {
  mainAnimateDown();
  setBodyBgClass();
  setActiveMenuLink();
});

// back to home =================================================

function backToHome() {
  const allSections = document.querySelectorAll('.section');
  allSections.forEach(section => {
    mainAnimateUp();
  })
  setBodyBgClass();
  setActiveMenuLink();
}

// set background color  ========================================

export function setBodyBgClass() {
  const currentSection = document.querySelector('.top-section');
  if (currentSection.getAttribute('data-bgcolor') === 'white') {
    body.classList.remove('black');
    body.classList.add('white');
    downloadBtnIcon.setAttribute('src', './img/svg/white-download.svg');
    downloadBtnIcon.classList.add('1')
  } else if (currentSection.getAttribute('data-bgcolor') === 'black') {
    body.classList.remove('white');
    body.classList.add('black');
    downloadBtnIcon.setAttribute('src', './img/svg/black-download.svg');
  }
}
setBodyBgClass();

// ==============================================================
function isIntersect({
  direction,
  el
}) {
  const onEntry = (entry) => {
    if (entry[0].isIntersecting) {
      if (!document.body.classList.contains('animation') && direction === 'down' && !document.body.classList.contains('project-active')) {
        mainAnimateDown();
        setBodyBgClass();
        setActiveMenuLink();
      } else if (!document.body.classList.contains('animation') && direction === 'up' && !document.body.classList.contains('project-active')) {
        mainAnimateUp();
        setBodyBgClass();
        setActiveMenuLink();
      }
    }
  }
  const animationObserver = new IntersectionObserver(onEntry, {});
  const observerEl = document.querySelector(el);
  if (observerEl) {
    animationObserver.observe(observerEl);
  }
}


export function handleKeyPressAnimation(e) {
  if (e.code === 'ArrowDown' && !document.body.classList.contains('animation') && !document.body.classList.contains('project-active')) {
    isIntersect({
      direction: 'down',
      el: '.top-section .bottom'
    });
  } else if (e.code === 'ArrowUp' && !document.body.classList.contains('animation') && !document.body.classList.contains('project-active')) {
    isIntersect({
      direction: 'up',
      el: '.top-section .top'
    });
  }
}
// ==============================================================
let xDown = null;
let yDown = null;

function handleTouchStart(evt) {
  xDown = evt.touches[0].clientX;
  yDown = evt.changedTouches[0].clientY;
}
let animationObserver
let animationObserverBottom

function handleTouchMove(evt) {
  let yUp = evt.changedTouches[0].clientY;
  if (yDown > yUp) {
    if (!document.body.classList.contains('animation') && document.body.classList.contains('last-project-page')) {
      closeProject();
    }
    const onEntry = (entry, observe) => {
      if (entry[0].isIntersecting) {
        if (!document.body.classList.contains('animation') && !document.body.classList.contains('project-active')) {
          mainAnimateDown();
          setBodyBgClass();
          setActiveMenuLink();
        }
        observe.disconnect(animationObserver);
      }
    }
    animationObserver = new IntersectionObserver(onEntry, {});
    const currentTopBlock = document.querySelector('.top-section .bottom');
    if (currentTopBlock) {
      animationObserver.observe(currentTopBlock);
    }
  } else if (yUp > yDown) {
    const onEntry2 = (entry, observe) => {
      if (entry[0].isIntersecting) {
        if (!document.body.classList.contains('animation') && !document.body.classList.contains('project-active')) {
          mainAnimateUp();
          setBodyBgClass();
          setActiveMenuLink();
        }
      }
    }
    animationObserverBottom = new IntersectionObserver(onEntry2, {});
    const currentBottomBlock = document.querySelector('.top-section .top');
    if (currentBottomBlock) {
      animationObserverBottom.observe(currentBottomBlock);
    }
  }
}
// ==============================================================
function isIntersecting({
  scrollEvent,
  elementClass
}) {
  const onEntry = (entry) => {
    if (entry[0].isIntersecting) {
      IsIntersecting = true;
      animation(scrollEvent, IsIntersecting)
    }
  }
  const animationObserver = new IntersectionObserver(onEntry, {});
  const observerEl = document.querySelector(elementClass);
  if (observerEl) {
    animationObserver.observe(observerEl);
  }
}
// ==============================================================
function animation(e, IsIntersecting) {
  if (e.direction === 'up' && IsIntersecting && !document.body.classList.contains('animation') && !document.body.classList.contains('project-active')) {
    mainAnimateUp();
    setBodyBgClass();
    setActiveMenuLink();
  } else if (e.direction === 'down' && IsIntersecting && !document.body.classList.contains('animation') && !document.body.classList.contains('project-active')) {
    mainAnimateDown();
    setBodyBgClass();
    setActiveMenuLink();
  }
}
const indicatorUp = new WheelIndicator({
  elem: document.body,
  callback: function (e) {
    if (e.direction === 'up') {
      isIntersecting({
        scrollEvent: e,
        elementClass: '.top-section .top'
      })
    }
  }
});
indicatorUp.getOption('preventMouse');
// ==============================================================
const indicatorDown = new WheelIndicator({
  elem: document.body,
  callback: function (e) {
    if (e.direction === 'down') {
      isIntersecting({
        scrollEvent: e,
        elementClass: '.top-section .bottom'
      })
    }
  }
});
indicatorDown.getOption('preventMouse');
// ==============================================================
const indicator = new WheelIndicator({
  callback: function (e) {
    if (e.direction === 'down' && document.body.classList.contains('last-project-page') && !document.body.classList.contains('animation')) {
      closeProject();
    }
  }
});
indicator.getOption('preventMouse');