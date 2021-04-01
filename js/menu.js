'use strict';
import {
  setBodyBgClass
} from "./mainPageTransition.js";
import {
  closeProject
} from "./projects.js";
const menuBtn = document.querySelector('.js-menu_btn');
const menu = document.querySelector('.js-menu-wrapper');
const menuWindow = document.querySelector('.js-menu-window');
const menuTitle = document.querySelector('.js-menu-title');
const menuText = document.querySelector('.js-menu-subtext');
const menuLinks = document.querySelectorAll('.js-nav__link');
const allMenuLinks = document.querySelectorAll('.js-MenuLink');
const menuBtnLines = document.querySelector('.js-menu_btn .line-menu');
const allSections = document.querySelectorAll('.section');
const titleContentByDefault = menuTitle.textContent;
const textContentByDefault = menuText.textContent;
menuBtn.addEventListener('click', toggleMenu);
menuLinks.forEach(link => {
  link.addEventListener('mouseover', addActiveLinkClass);
  link.addEventListener('mouseleave', removeActiveLinkClass);
  link.addEventListener('mouseover', setMenuTitleText);
  link.addEventListener('mouseleave', deleteMenuTitleText);
});
allMenuLinks.forEach(link => {
  link.addEventListener('click', goToThePage);
});
let toggle = true;
const titles = [{
    section: 'whois',
    title: 'About Me',
  },
  {
    section: 'www',
    title: 'Recent Experiences',
  },
  {
    section: 'why',
    title: 'Some Reasons',
  },
  {
    section: 'how',
    title: 'Recent Works',
  },
  {
    section: 'hello',
    title: 'Contact Me',
  }
]

// CLOSE/OPEN MENU

function toggleMenu() {
  if (toggle) {
    menuBtn.classList.add('open');
    menu.classList.add('menu-wrapper--open');
    document.body.classList.add('animation');
    toggle = false;
  } else {
    menuBtn.classList.remove('open');
    menu.classList.remove('menu-wrapper--open');
    document.body.classList.remove('animation');
    removeActiveLinkClass();
    toggle = true;
  }
}

// =============================================================================

function addActiveLinkClass(e) {
  if (e.target.nodeName !== "BUTTON") return;
  const hoverLink = e.target.getAttribute('data-linkid');
  menuLinks.forEach(link => {
    if (link.getAttribute('data-linkid') !== hoverLink) {
      link.classList.add('nav__link--unhover');
    }
  })
}

function removeActiveLinkClass() {
  menuLinks.forEach(link => {
    link.classList.remove('nav__link--unhover');
  })
}


function setMenuTitleText(e) {
  const path = e.target.dataset.linkid;
  allSections.forEach(section => {
    if (section.getAttribute('id') === path) {
      section.querySelectorAll('*').forEach(el => {
        if (el.classList.contains('js-menu-text')) {
          menuText.textContent = el.textContent;
        }
      });
      titles.forEach(title => {
        if (section.getAttribute('id') === title.section) {
          menuTitle.textContent = title.title;
        }
      })
    }
    if (section.getAttribute('id') === path) {
      section.querySelector('.section-content').style.height = '100%';
      const sectionCode = section.cloneNode(true);
      sectionCode.style.transform = 'translateY(0)';
      sectionCode.querySelectorAll('*').forEach(child => {
        if (child.classList.contains('svg')) {
          child.remove()
        }
      })
      menuWindow.insertAdjacentElement('beforeend', sectionCode)
    }
  })
}

function deleteMenuTitleText(e) {
  menuTitle.textContent = titleContentByDefault;
  menuText.textContent = textContentByDefault;
  menuWindow.innerHTML = ''
}

export function setActiveMenuLink() {
  const currentSection = document.querySelector('.top-section');
  menuLinks.forEach(link => {
    link.classList.remove('nav__link--current');
    if (link.dataset.linkid === currentSection.getAttribute('id')) {
      link.classList.add('nav__link--current');
    }
  })
}
setActiveMenuLink();

function goToThePage(e) {

  if (document.body.classList.contains('project-active')) {
    closeProject();
  }
  const clickedLink = e.currentTarget.dataset.linkid;
  let currentSection = document.querySelector('.top-section')
  if (e.currentTarget.dataset.linkid === currentSection.getAttribute('id')) {

    toggleMenu();
    return
  }
  let zIndexCurrent = window.getComputedStyle(currentSection).getPropertyValue('z-index');
  allSections.forEach(section => {
    section.classList.remove('top-section');
    if (section.getAttribute('id') === clickedLink) {
      const zIndex = window.getComputedStyle(section).getPropertyValue('z-index');
      if (zIndexCurrent > zIndex) {
        let count = 0;
        const animationInt = setInterval(() => {
          mainAnimateDownByLinks(currentSection);
          count += 1
          currentSection = document.querySelector('.top-section');
          if (count === (Number(zIndexCurrent) - Number(zIndex))) {
            clearInterval(animationInt);
          }

        }, 5);
      } else if (zIndexCurrent < zIndex) {
        let count = 0;
        const animationInt = setInterval(() => {
          mainAnimateUpByLinks(currentSection);
          count += 1
          currentSection = document.querySelector('.top-section');
          if (count === (Number(zIndex) - Number(zIndexCurrent))) {
            clearInterval(animationInt);
          }

        }, 5);
      }
    }
  })
  const animationTm = setTimeout(() => {
    setBodyBgClass();
    toggleMenu();
    clearTimeout(animationTm)
  }, 900);
}

// ===========================================================================

function mainAnimateDownByLinks(currentSection) {
  anime({
    targets: currentSection,
    translateY: {
      value: `-${currentSection.offsetHeight * 2}px`,
      delay: 100,
      duration: 10,
      easing: 'easeInOutQuad'
    }
  });
  anime({
    targets: document.querySelector('.svg path'),
    duration: 10,
    easing: 'linear',
    d: 'M -30.45,-57.86 -30.45,442.6 53.8,443.8 53.8,396.3 179.5,396.3 179.5,654.7 193.3,654.7 193.3,589.1 253.1,589.1 253.1,561.6 276.1,561.6 276.1,531.2 320.6,531.2 320.6,238.6 406.5,238.6 406.5,213.9 435.6,213.9 435.6,246.2 477,246.2 477,289.9 527.6,289.9 527.6,263.3 553.7,263.3 553.7,280.4 592,280.4 592,189.2 742.3,189.2 742.3,259.5 762.2,259.5 762.2,103.7 776,103.7 776,77.11 791.3,77.11 791.3,18.21 852.7,18.21 852.7,86.61 871.1,86.61 871.1,231 878.7,240.5 878.7,320.3 891,320.3 891,434.3 923.2,434.3 923.2,145.5 940.1,145.5 940.1,117 976.9,117 976.9,139.8 1031,139.8 1031,284.2 1041,284.2 1041,242.4 1176,242.4 1176,282.3 1192,282.3 1192,641.4 1210,641.4 1210,692.7 1225,692.7 1225,599.6 1236,599.6 1236,527.4 1248,527.4 1248,500.8 1273,500.8 1273,523.6 1291,523.6 1291,652.8 1316,652.8 1316,533.1 1337,533.1 1337,502.7 1356,502.7 1356,523.6 1414,523.6 1414,491.3 1432,491.3 1432,523.6 1486,523.6 1486,-57.86 Z'
  });
  allSections.forEach(section => {
    if (section.classList.contains('top-section')) {
      section.classList.remove('top-section')
    }
  })
  if (!currentSection.nextElementSibling) {
    return
  }
  currentSection.nextElementSibling.classList.add('top-section')
  const section = currentSection.nextElementSibling;
  Object.values(section.children).forEach(child => {
    if (child.classList.contains('section-content')) {
      if (child.classList.contains('black-wrapper')) {
        document.body.classList.remove('white')
        document.body.classList.add('black')
      } else if (child.classList.contains('white-wrapper')) {
        document.body.classList.remove('black')
        document.body.classList.add('white')
      }
    }
  });
  setActiveMenuLink();
}

function mainAnimateUpByLinks(currentSection) {

  let height;
  if (!currentSection.previousElementSibling) {
    return
  }
  if (currentSection.previousElementSibling) {
    [...currentSection.previousElementSibling.children].forEach(child => {
      if (child.classList.contains('shape')) {
        height = window.getComputedStyle(child).getPropertyValue("height");
      }
    })
  }

  anime({
    targets: currentSection.previousElementSibling,
    translateY: {
      value: '0px',
      duration: 10,
      easing: 'easeInOutQuad'
    }
  });
  anime({
    targets: document.querySelector('.shape path'),
    duration: 10,
    easing: 'linear',
    d: 'M -30.45,-57.86 -30.45,442.6 53.8,443.8 53.8,396.3 179.5,396.3 179.5,654.7 193.3,654.7 193.3,589.1 253.1,589.1 253.1,561.6 276.1,561.6 276.1,531.2 320.6,531.2 320.6,238.6 406.5,238.6 406.5,213.9 435.6,213.9 435.6,246.2 477,246.2 477,289.9 527.6,289.9 527.6,263.3 553.7,263.3 553.7,280.4 592,280.4 592,189.2 742.3,189.2 742.3,259.5 762.2,259.5 762.2,103.7 776,103.7 776,77.11 791.3,77.11 791.3,18.21 852.7,18.21 852.7,86.61 871.1,86.61 871.1,231 878.7,240.5 878.7,320.3 891,320.3 891,434.3 923.2,434.3 923.2,145.5 940.1,145.5 940.1,117 976.9,117 976.9,139.8 1031,139.8 1031,284.2 1041,284.2 1041,242.4 1176,242.4 1176,282.3 1192,282.3 1192,641.4 1210,641.4 1210,692.7 1225,692.7 1225,599.6 1236,599.6 1236,527.4 1248,527.4 1248,500.8 1273,500.8 1273,523.6 1291,523.6 1291,652.8 1316,652.8 1316,533.1 1337,533.1 1337,502.7 1356,502.7 1356,523.6 1414,523.6 1414,491.3 1432,491.3 1432,523.6 1486,523.6 1486,-57.86 Z'
  });
  allSections.forEach(section => {
    if (section.classList.contains('top-section')) {
      section.classList.remove('top-section')
    }
  })
  currentSection.previousElementSibling.classList.add('top-section')
  const section = currentSection.previousElementSibling;
  Object.values(section.children).forEach(child => {
    if (child.classList.contains('section-content')) {
      if (child.classList.contains('black-wrapper')) {
        document.body.classList.remove('white')
        document.body.classList.add('black')
      } else if (child.classList.contains('white-wrapper')) {
        document.body.classList.remove('black')
        document.body.classList.add('white')
      }
    }
  });
  setActiveMenuLink();
}