import {sendData} from './fetch.js';
import {checkEscapeKey, checkMouseClick, toggleClass} from './utils.js';
import {pristine} from './validate.js';
import {showModal} from './modal-messages.js';
import './picture-effect.js';
import './picture-scale.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];  // Разрешения изображений, доступные для отправки на сервер
const DEFAULT_PHOTO_URL = 'img/upload-default-image.jpg';  // Адрес изображения-заглушки для показа до загрузки своей фотографии

const pageBody = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadSubmitButton = document.querySelector('.img-upload__submit');
const uploadButton = uploadForm.querySelector('.img-upload__start input[type=file]');
const uploadModal = uploadForm.querySelector('.img-upload__overlay');
const uploadPreview = uploadModal.querySelector('.img-upload__preview img');
const uploadModalCloseButton = uploadModal.querySelector('.img-upload__cancel');
const scaleControlValue = document.querySelector('.scale__control--value');
const effectLevelSlider = document.querySelector('.effect-level__slider');

const toogleUploadPictureModal = (isHidden) => {
  toggleClass(pageBody, 'modal-open', isHidden);
  toggleClass(uploadModal, 'hidden', !isHidden);
};

/**
 * Блокировка кнопки Submit на время отправки данных на сервер.
 * Отображение надписи для уведомления пользователя о процессе отправки.
 */
const blockSubmitButton = () => {
  uploadSubmitButton.disabled = true;
  uploadSubmitButton.textContent = 'Отправляется...';
};

/**
 * Разблокировка кнопки Submit на время отправки данных на сервер.
 * Как при удачной отправке данных, так и при  неудачной.
 */
const unblockSubmitButton = () => {
  uploadSubmitButton.disabled = false;
  uploadSubmitButton.textContent = 'Опубликовать';
};

/**
 * Приведение модального окна и полей формы в состояние по-умолчанию.
 */
const setUploadPictureModalDefault = () => {
  toogleUploadPictureModal(false);
  unblockSubmitButton();
  uploadForm.reset();
  uploadButton.value = '';
  uploadPreview.style = '';
  uploadPreview.classList = '';
  scaleControlValue.value = '100%';
  scaleControlValue.setAttribute('value', '100%');
  uploadPreview.style.transform = 'scale(1)';
};

const setFormSubmitHandler = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton();
    sendData(
      () => {
        showModal('successModal');
        setUploadPictureModalDefault();
      },
      () => {
        showModal('errorModal');
        setUploadPictureModalDefault();
      },
      new FormData(evt.target),
    );
  }
};

/**
 * Загрузка собственного изображения и подстановка в модальное окно.
 * При выборе файла с неподходящим разрешением показывается фото-заглушка.
 */
const uploadPicture = () => {
  const file = uploadButton.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => (fileName.endsWith(it)));
  uploadPreview.src = matches ? URL.createObjectURL(file) : DEFAULT_PHOTO_URL;
};

const documentKeydownHandler = (evt) => {
  if (checkEscapeKey(evt)) {
    closePictureUploadModal();
  }
};

const uploadModalCloseButtonClickHandler = (evt) => {
  if (checkMouseClick(evt)) {
    closePictureUploadModal();
  }
};

/**
 * Закрытие модального окна и очищение полей формы до состояния по-умолчанию.
 */

function closePictureUploadModal() {
  toogleUploadPictureModal(false);
  uploadForm.reset();
  uploadButton.value = '';
  document.removeEventListener('keydown', documentKeydownHandler);
  uploadModalCloseButton.removeEventListener('click', uploadModalCloseButtonClickHandler);
  pristine.reset();
  uploadPreview.style = '';
  uploadPreview.classList = '';
}

/**
 * Показ модального окна с загрузкой своей фотографии и наложением эффектов.
 * Скрытие модального окна происходит при клипе на кнопку закрытия и нажатие клавиши "Escape".
 */
const openPictureUploadModal = () => {
  toogleUploadPictureModal(true);
  document.addEventListener('keydown', documentKeydownHandler);
  uploadModalCloseButton.addEventListener('click', uploadModalCloseButtonClickHandler);
  uploadForm.addEventListener('submit', setFormSubmitHandler);
  scaleControlValue.value = '100%';
  uploadPreview.style.transform = 'scale(1)';
  effectLevelSlider.classList.add('hidden');
};

uploadButton.addEventListener('change', uploadPicture);
uploadButton.addEventListener('change', openPictureUploadModal);
