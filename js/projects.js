import {
  handleKeyPressAnimation
} from "./mainPageTransition.js";
import {
  mainAnimateDown
} from "./mainAnimationDown.js";
import {
  setActiveMenuLink
} from "./menu.js";
import {
  setBodyBgClass
} from "./mainPageTransition.js";


const menuLinks = document.querySelectorAll('.js-nav__link');
const sectionsWrap = document.querySelector('.main');
sectionsWrap.children[0].classList.add('top-section');
const allProjects = document.querySelectorAll('.js-project');
const closeBtns = document.querySelectorAll('.js-project-close-btn');
const closeHelloBtn = document.querySelector('.js-project-close-btn-h');
const allProjectsOverlay = document.querySelectorAll('.project');
const paths = document.querySelectorAll('#project-overlay-svg path');

allProjects.forEach(project => {
  project.addEventListener('click', goToTheProject);
})
closeBtns.forEach(btn => {
  btn.addEventListener('click', closeProject);
})
closeHelloBtn.addEventListener('click', () => {
  closeProject();
  const tm = setTimeout(() => {
    mainAnimateDown();
    setBodyBgClass();
    setActiveMenuLink();
    clearTimeout(tm)
  }, 1000)
});



function goToTheProject(e) {
  document.body.style.overflow = 'auto';
  window.removeEventListener('keydown', handleKeyPressAnimation)
  menuLinks.forEach(item => {
    item.classList.remove('nav__link--current')
  })
  let element = e.currentTarget;
  const projectId = element.getAttribute('id')
  document.body.classList.add('project-active')
  const indexes = [1, 0, 17, 5, 4, 22, 19, 2, 25, 14, 12, 21, 3, 27, 13, 7, 16, 24, 6, 15, 26, 20, 8, 18, 11, 9, 23, 10];
  let index = 0;
  const intervalId = setInterval(() => {
    const needIdx = indexes[index];
    paths[needIdx].style.display = 'block';
    index += 1;
    if (indexes.length === index) {
      clearInterval(intervalId)
    }
  }, 30)

  const projectTm = setTimeout(() => {
    document.querySelector('.project-appear').classList.add('project-visible')
    allProjectsOverlay.forEach(project => {
      if (project.classList.contains('current-project')) {
        project.classList.remove('current-project')
      }
      if (project.dataset.projectid === projectId) {
        window.addEventListener('resize', setSectionWrapHeight(projectId));
        project.querySelector('.transotion-section').classList.add('current-page')
        project.classList.add('current-project')
      }
    })
    clearTimeout(projectTm)
    setSectionWrapHeight(projectId);
  }, 1000)
}

export function closeProject(e) {
  document.body.style.overflow = 'hidden'
  document.body.classList.remove('last-project-page');
  window.addEventListener('keydown', handleKeyPressAnimation)
  if (document.querySelector('.project-appear').classList.contains('project-visible')) {
    document.querySelector('.project-appear').classList.remove('project-visible')
  }
  const indexes = [1, 0, 17, 5, 4, 22, 19, 2, 25, 14, 12, 21, 3, 27, 13, 7, 16, 24, 6, 15, 26, 20, 8, 18, 11, 9, 23, 10];
  let index = 0;
  const intervalId = setInterval(() => {
    const needIdx = indexes[index];
    paths[needIdx].style.display = 'none';
    index += 1;
    if (indexes.length === index) {
      clearInterval(intervalId)
    }
  }, 50)
  document.body.style.height = '100%';
  const tm = setTimeout(() => {
    document.body.classList.remove('project-active');

  }, 3000)
  const howLink = document.querySelector('[data-linkid="how"]');
  howLink.classList.add('nav__link--current');
  if (e && e.target.classList.contains('js-project-close') || !e) {
    const tm = setTimeout(() => {
      document.querySelectorAll('.transotion-wrap').forEach(parent => {
        Object.values(parent.children).forEach(child => {
          child.classList.remove('current-page')
        })
        Object.values(parent.children)[0].classList.add('current-page')
      })

      clearTimeout(tm)
    }, 1500)
  }
}


function setSectionWrapHeight(projectId) {
  const body = document.body;
  allProjectsOverlay.forEach(project => {
    if (project.dataset.projectid === projectId) {
      let biggerValue = 0;
      const wrapper = project.querySelector('.transotion-wrap');
      Object.values(wrapper.children).forEach(child => {
        if (Object.values(Object.values(wrapper.children)).length === 1) {
          document.body.classList.add('last-project-page');
        }
        if (child.clientHeight > biggerValue) {
          biggerValue = child.clientHeight;
        }
      })
      const height = biggerValue;
      wrapper.style.height = `${height}px`;
      body.style.height = `${height}px`;
      body.style.minHeight = `calc(var(--vh, 1vh) * 100)`;
    }
  })
}

const allNextBtns = document.querySelectorAll('.next');
const allPrevBtns = document.querySelectorAll('.prev');
const allProjectsNextBtns = document.querySelectorAll('.js-next-project');
const allProjectsPrevBtns = document.querySelectorAll('.js-prev-project');
allNextBtns.forEach(btn => {
  btn.addEventListener('click', nextSubPageAnimation);
});
allPrevBtns.forEach(btn => {
  btn.addEventListener('click', prevSubPageAnimation);
});
allProjectsNextBtns.forEach(btn => {
  btn.addEventListener('click', nextPageAnimation);
});
allProjectsPrevBtns.forEach(btn => {
  btn.addEventListener('click', prevPageAnimation);
});

let hasClass;

function nextPageAnimation(e) {
  document.body.classList.remove('last-project-page');
  const nextProjectId = e.currentTarget.closest('.project').nextElementSibling.getAttribute('data-projectId');

  const element = e.currentTarget;
  const parent = element.closest('.project');
  const allParentChildren = parent.querySelectorAll('*');
  [...allParentChildren].forEach(child => {
    if (child.classList.contains('transotion-section')) {
      child.classList.remove('current-page');
    }
  })
  parent.classList.remove('current-project')
  parent.nextElementSibling.classList.add('current-project')
  parent.nextElementSibling.querySelector('.transotion-section').classList.add('current-page')
  setSectionWrapHeight(nextProjectId);
}

function prevPageAnimation(e) {
  document.body.classList.add('last-project-page');
  const prevProjectId = e.currentTarget.closest('.project').previousElementSibling.getAttribute('data-projectId');

  const element = e.currentTarget;
  const parent = element.closest('.project');
  parent.classList.remove('current-project')
  parent.previousElementSibling.classList.add('current-project')
  const allChildren = parent.previousElementSibling.querySelectorAll('*');
  const result = [];
  [...allChildren].forEach(child => {
    if (child.classList.contains('transotion-section')) {
      result.push(child);
    }
  })
  result[result.length - 1].classList.add('current-page')
  setSectionWrapHeight(prevProjectId);
}

function nextSubPageAnimation(e) {
  const element = e.currentTarget;
  const parent = element.closest('.transotion-section');
  hasClass = parent.classList.contains('current-page');
  parent.classList.add('pt-page-moveToLeftEasing');
  parent.classList.add('pt-page-ontop');
  const nextSection = parent.nextElementSibling;
  nextSection.classList.add('pt-page-moveFromRight');
  nextSection.classList.add('current-page');
  if (!nextSection.nextElementSibling) {
    document.body.classList.add('last-project-page');
  }
  const timeout = setTimeout(() => {
    parent.classList.remove('pt-page-moveToLeftEasing');
    parent.classList.remove('pt-page-ontop');
    nextSection.classList.remove('pt-page-moveFromRight');
    parent.classList.remove('current-page');
    setSectionWrapHeight();
    clearTimeout(timeout)
  }, 1000);
}

function prevSubPageAnimation(e) {
  document.body.classList.remove('last-project-page');
  const element = e.currentTarget;
  const parent = element.closest('.transotion-section');
  hasClass = parent.classList.contains('current-page');
  parent.classList.add('pt-page-moveToRightEasing');
  parent.classList.add('pt-page-ontop');
  const prevSection = parent.previousElementSibling;
  prevSection.classList.add('pt-page-moveFromLeft');
  prevSection.classList.add('current-page');
  const timeout = setTimeout(() => {
    parent.classList.remove('pt-page-moveToRightEasing');
    parent.classList.remove('pt-page-ontop');
    prevSection.classList.remove('pt-page-moveFromLeft');
    parent.classList.remove('current-page');
    setSectionWrapHeight();
    clearTimeout(timeout)
  }, 1000);
}