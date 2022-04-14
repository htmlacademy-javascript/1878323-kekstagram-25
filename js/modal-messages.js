import {checkEscapeKey} from './utils.js';

const MESSAGE_TIMEOUT = 5000;  // Время показа (в миллисекундах) всплывающего окошка с ошибкой получения изображений с сервера

const pageBody = document.querySelector('body');
const successModal = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const successModalInner = successModal.querySelector('.success__inner');
const successModalButton = successModal.querySelector('.success__button');
const errorModal = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorModalButton = errorModal.querySelector('.error__button');
const errorModalInner = errorModal.querySelector('.error__inner');
const errorLoadingModal = document.querySelector('#error-loading').content.querySelector('.error-loading').cloneNode(true);
const errorLoadingModalInner = errorModal.querySelector('.error-loading__inner');

let activeModalName = '';

const documentClickHandler = () => removeModal();
const documentKeydownHandler = (evt) => {
  if (checkEscapeKey(evt)) {
    removeModal();
  }
};

const closeErrorLoadingModal = () => {
  errorLoadingModal.remove();
};

const closeSuccessModal = () => {
  successModal.remove();
};

const closeErrorModal = () => {
  errorModal.remove();
};

function removeModal() {
  document.removeEventListener('click', documentClickHandler);
  document.removeEventListener('keydown', documentKeydownHandler);

  switch (activeModalName) {
    case 'errorLoadingModal':
      closeErrorLoadingModal();
      break;
    case 'successModal':
      closeSuccessModal();
      break;
    case 'errorModal':
      closeErrorModal();
      break;
  }
}

const successModalClickHandler = () => removeModal();
const successModalButtonClickHandler = () => removeModal();
const errorModalClickHandler = () => removeModal();
const errorModalButtonClickHandler = () => removeModal();
const errorLoadingModalClickHandler = () => removeModal();

const showErrorLoadingModal = () => {
  pageBody.append(errorLoadingModal);
  errorLoadingModal.addEventListener('click', errorLoadingModalClickHandler);
  errorLoadingModalInner.addEventListener('click', (evt) => {
    evt.stopPropagation();
  });
  setTimeout(() => {
    removeModal();
  }, MESSAGE_TIMEOUT);
};

const showSuccessModal = () => {
  pageBody.append(successModal);
  successModal.addEventListener('click', successModalClickHandler);
  successModalInner.addEventListener('click', (evt) => {
    evt.stopPropagation();
  });
  successModalButton.addEventListener('click', successModalButtonClickHandler);
};

const showErrorModal = () => {
  pageBody.append(errorModal);
  errorModal.addEventListener('click', errorModalClickHandler);
  errorModalInner.addEventListener('click', (evt) => {
    evt.stopPropagation();
  });
  errorModalButton.addEventListener('click', errorModalButtonClickHandler);
};

const showModal = (modalName) => {
  document.addEventListener('click', documentClickHandler);
  document.addEventListener('keydown', documentKeydownHandler);
  activeModalName = modalName;

  switch (modalName) {
    case 'errorLoadingModal':
      showErrorLoadingModal();
      break;
    case 'successModal':
      showSuccessModal();
      break;
    case 'errorModal':
      showErrorModal();
      break;
  }
};


export {showModal};
