'use strict';
import {
  handleKeyPressAnimation
} from "./mainPageTransition.js";
const formModal = document.querySelector('.form-modal');
const formModalSuccess = document.querySelector('.form-modal__success');
const formModalError = document.querySelector('.form-modal__error');
const closeFormBtnAll = document.querySelectorAll('.form-modal__btn')
const formBtn = document.querySelector('.js-form-btn');
const formNameInput = document.querySelector('#name');
const formSubjectInput = document.querySelector('#subject');
const allInputs = document.querySelectorAll('.js-input');

allInputs.forEach(input => {
  input.addEventListener('focus', () => {
    document.body.classList.add('animation');
  })
  input.addEventListener('blur', () => {
    document.body.classList.remove('animation');
  })
})

formBtn.addEventListener('mouseover', formValidate);
formBtn.addEventListener('mouseleave', formValidateCancel);
formBtn.addEventListener('click', formValidateClick)
closeFormBtnAll.forEach(btn => {
  btn.addEventListener('click', closeForm)
})
formModal.addEventListener('click', backdropCloseForm)


function formValidate(e) {
  if (formNameInput.value === '' || formSubjectInput.value === '') {
    if (formNameInput.value === '' && formSubjectInput.value === '') {
      formNameInput.classList.add('input-error');
      formSubjectInput.classList.add('input-error');
    } else if (formSubjectInput.value === '') {
      formSubjectInput.classList.add('input-error');
    } else if (formNameInput.value === '') {
      formNameInput.classList.add('input-error');
    }
  } else {
    if (!formBtn.classList.contains('loading')) {
      formBtn.classList.add('hello-hero__btn-send')
    }

  }
}

function formValidateClick(e) {
  if (formNameInput.value === '' || formSubjectInput.value === '') {
    e.preventDefault()
    if (formNameInput.value === '' && formSubjectInput.value === '') {
      e.preventDefault()
    }
  } else {

    formBtn.classList.remove('hello-hero__btn-send')
    formBtn.classList.add('loading')
  }
}

function formValidateCancel() {
  formNameInput.classList.remove('input-error');
  formSubjectInput.classList.remove('input-error');
}

function closeForm() {
  document.body.classList.remove('animation')
  window.addEventListener('keydown', handleKeyPressAnimation)
  window.removeEventListener('keydown', handleKeyPress)
  formModal.classList.remove('form-modal-is-open');
}

function backdropCloseForm(e) {
  if (e.currentTarget !== e.target) {
    return
  }
  closeForm()
}

function handleKeyPress(e) {
  if (e.code !== 'Escape') {
    return
  }
  closeForm()
}

window.onload = function () {
  document
    .getElementById('contact-form')
    .addEventListener('submit', function (event) {
      event.preventDefault();
      // generate a five digit number for the contact_number variable
      this.contact_number.value = (Math.random() * 100000) | 0;
      // these IDs from the previous steps
      emailjs.sendForm('service_if8n1kc', 'template_wri2ll', this).then(
        function () {
          document.body.classList.add('animation')
          window.removeEventListener('keydown', handleKeyPressAnimation)

          formModal.classList.add('form-modal-is-open');
          window.addEventListener('keydown', handleKeyPress)
          formModalSuccess.style.opacity = 1;
          formModalSuccess.style.zIndex = 1;
          formBtn.classList.remove('loading')
        },
        function (error) {
          document.body.classList.add('animation')
          window.removeEventListener('keydown', handleKeyPressAnimation)

          formModal.classList.add('form-modal-is-open');
          window.addEventListener('keydown', handleKeyPress)
          formModalError.style.opacity = 1;
          formModalError.style.zIndex = 1;
          formBtn.classList.remove('loading')
        },
      );
    });
};