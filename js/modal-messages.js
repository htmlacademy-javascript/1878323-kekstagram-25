import {isEscapeKey, isMouseClick} from './utils.js';

const MESSAGE_TIMEOUT = 5000;                                           // Время показа (в миллисекундах) всплывающего окошка с ошибкой получения изображений с сервера

const pageBody = document.querySelector('body');
const successModal = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const successModalButton = successModal.querySelector('.success__button');
const errorModal = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorModalButton = errorModal.querySelector('.error__button');
const errorLoadingModal = document.querySelector('#error-loading').content.querySelector('.error-loading').cloneNode(true);

/**
 * Удаление модального окна при успешной отправке фотографии на сервер.
 * DOM-элемент с модальным окном удаляется из DOM-дерева, чтобы не засорять оперативную память.
 */
const removeSuccessModal = (evt) => {
  if (isEscapeKey(evt) || isMouseClick(evt)) {
    successModal.remove();
    document.removeEventListener('keydown', removeSuccessModal);
  }
};

/**
 * Показ модального окна при успешной отправке фотографии на сервер.
 */
const showSuccessModal = () => {
  pageBody.append(successModal);
  successModalButton.addEventListener('click', removeSuccessModal);
  document.addEventListener('keydown', removeSuccessModal);
};


/**
 * Удаление модального окна при неудачной отправке фотографии на сервер.
 * DOM-элемент с модальным окном удаляется из DOM-дерева, чтобы не засорять оперативную память.
 */
const removeErrorModal = (evt) => {
  if (isEscapeKey(evt) || isMouseClick(evt)) {
    errorModal.remove();
    document.removeEventListener('keydown', removeErrorModal);
  }
};


/**
 * Показ модального окна при неудачной отправке фотографии на сервер.
 */
const showErrorModal = () => {
  pageBody.append(errorModal);
  errorModalButton.addEventListener('click', removeErrorModal);
  document.addEventListener('keydown', removeErrorModal);
};


/**
 * Удаление модального окна при неудачной загрузке фотографий с сервера.
 * DOM-элемент с модальным окном удаляется из DOM-дерева, чтобы не засорять оперативную память.
 */
const removeErrorLoadingModal = () => {
  errorLoadingModal.remove();
  document.removeEventListener('click', removeErrorLoadingModal);
  document.removeEventListener('keydown', removeErrorLoadingModal);
};


/**
 * Показ модального окна при неудачной загрузке фотографий с сервера.
 */
const showErrorLoadingModal = () => {
  pageBody.append(errorLoadingModal);
  document.addEventListener('click', removeErrorLoadingModal);
  document.addEventListener('keydown', removeErrorLoadingModal);
  setTimeout(() => {
    removeErrorLoadingModal();
  }, MESSAGE_TIMEOUT);
};


export {
  showSuccessModal,
  showErrorModal,
  showErrorLoadingModal
};
