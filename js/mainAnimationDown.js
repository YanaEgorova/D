'use strict';
export function mainAnimateDown() {
  const currentSection = document.querySelector('.top-section');
  const content = document.querySelector('.top-section .section-content__inner');
  const svg = document.querySelector('.top-section .svg');
  const contentHeight = Number.parseFloat(window.getComputedStyle(content).getPropertyValue('height'));
  const svgHeight = Number.parseFloat(window.getComputedStyle(svg).getPropertyValue('height'));
  currentSection.classList.add('section-animation');
  if (!currentSection.nextElementSibling) {
    return
  }
  document.body.classList.add('animation');
  anime({
    targets: currentSection,
    translateY: {
      value: `-${contentHeight + svgHeight}px`,
      delay: 100,
      duration: 2000,
      easing: 'easeInOutQuad'
    }
  });
  anime({
    targets: svg,
    duration: 1200,
    easing: 'linear',
    d: 'M -30.45,-57.86 -30.45,442.6 53.8,443.8 53.8,396.3 179.5,396.3 179.5,654.7 193.3,654.7 193.3,589.1 253.1,589.1 253.1,561.6 276.1,561.6 276.1,531.2 320.6,531.2 320.6,238.6 406.5,238.6 406.5,213.9 435.6,213.9 435.6,246.2 477,246.2 477,289.9 527.6,289.9 527.6,263.3 553.7,263.3 553.7,280.4 592,280.4 592,189.2 742.3,189.2 742.3,259.5 762.2,259.5 762.2,103.7 776,103.7 776,77.11 791.3,77.11 791.3,18.21 852.7,18.21 852.7,86.61 871.1,86.61 871.1,231 878.7,240.5 878.7,320.3 891,320.3 891,434.3 923.2,434.3 923.2,145.5 940.1,145.5 940.1,117 976.9,117 976.9,139.8 1031,139.8 1031,284.2 1041,284.2 1041,242.4 1176,242.4 1176,282.3 1192,282.3 1192,641.4 1210,641.4 1210,692.7 1225,692.7 1225,599.6 1236,599.6 1236,527.4 1248,527.4 1248,500.8 1273,500.8 1273,523.6 1291,523.6 1291,652.8 1316,652.8 1316,533.1 1337,533.1 1337,502.7 1356,502.7 1356,523.6 1414,523.6 1414,491.3 1432,491.3 1432,523.6 1486,523.6 1486,-57.86 Z'
  });
  currentSection.classList.remove('top-section');
  currentSection.nextElementSibling.classList.add('top-section');
  Object.values(document.querySelector('.top-section').children).forEach(child => {
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
  setTimeout(() => {
    document.body.classList.remove('animation');
    currentSection.classList.remove('section-animation');
  }, 1500)
}