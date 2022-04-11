import {sendData} from './fetch.js';
import {isEscapeKey, isMouseClick, toggleClass} from './utils.js';
import {validatePristine} from './validate.js';
import {showErrorModal, showSuccessModal} from './modal-messages.js';
import './picture-effect.js';
import './picture-scale.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];                       // Разрешения изображений, доступные для отправки на сервер
const DEFAULT_PHOTO_URL = 'img/upload-default-image.jpg';               // Адрес изображения-заглушки для показа до загрузки своей фотографии

const bodyElement = document.querySelector('body');
const pictureUploadForm = document.querySelector('.img-upload__form');
const pictureUploadButton = pictureUploadForm.querySelector('.img-upload__start input[type=file]');
const pictureUploadModal = pictureUploadForm.querySelector('.img-upload__overlay');
const pictureUploadPreview = pictureUploadModal.querySelector('.img-upload__preview img');
const pictureUploadModalCloseButton = pictureUploadModal.querySelector('.img-upload__cancel');
const scaleControlValue = document.querySelector('.scale__control--value');
const effectLevelSlider = document.querySelector('.effect-level__slider');

const toogleUploadPictureModal = (isHidden) => {
  toggleClass(bodyElement, 'modal-open', isHidden);
  toggleClass(pictureUploadModal, 'hidden', !isHidden);
};

/**
 * Блокировка кнопки Submit на время отправки данных на сервер.
 * Отображение надписи для уведомления пользователя о процессе отправки.
 */
const blockSubmitButton = () => {
  pictureUploadModalCloseButton.disabled = true;
  pictureUploadModalCloseButton.textContent = 'Отправляется...';
};


/**
 * Разблокировка кнопки Submit на время отправки данных на сервер.
 * Как при удачной отправке данных, так и при неудачной.
 */
const unblockSubmitButton = () => {
  pictureUploadModalCloseButton.disabled = false;
  pictureUploadModalCloseButton.textContent = 'Опубликовать';
};

/**
 * Приведение модального окна и полей формы в состояние по-умолчанию.
 */
const setUploadPictureModalDefault = () => {
  toogleUploadPictureModal(false);
  unblockSubmitButton();
  pictureUploadForm.reset();
  pictureUploadButton.value = '';
  pictureUploadPreview.style = '';
  pictureUploadPreview.classList = '';
  scaleControlValue.value = '100%';
  scaleControlValue.setAttribute('value', '100%');
  pictureUploadPreview.style.transform = 'scale(1)';
};

const setFormSubmitHandler = (evt) => {
  evt.preventDefault();
  if (!validatePristine.validate()) {
    blockSubmitButton();
    sendData(
      () => {
        showSuccessModal();
        setUploadPictureModalDefault();
      },
      () => {
        showErrorModal();
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
  const file = pictureUploadButton.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => (fileName.endsWith(it)));
  if (matches) {
    pictureUploadPreview.src = URL.createObjectURL(file);
  } else {
    pictureUploadPreview.src = DEFAULT_PHOTO_URL;
  }
};


/**
 * Закрытие модального окна и очищение полей формы до состояния по-умолчанию.
 */
const closePictureUploadModal = (evt) => {
  if (isEscapeKey(evt) || isMouseClick(evt)) {
    toogleUploadPictureModal(false);
    pictureUploadForm.reset();
    // pictureUploadForm.removeEventListener('submit', setFormSubmitHandler);
    pictureUploadButton.value = '';
    document.removeEventListener('keydown', closePictureUploadModal);
    pictureUploadModalCloseButton.removeEventListener('click', closePictureUploadModal);
    validatePristine.reset();
    pictureUploadPreview.style = '';
    pictureUploadPreview.classList = '';
  }
};

/**
 * Показ модального окна с загрузкой своей фотографии и наложением эффектов.
 * Скрытие модального окна происходит при клипе на кнопку закрытия и нажатие клавиши "Escape".
 */
const openPictureUploadModal = () => {
  toogleUploadPictureModal(true);
  document.addEventListener('keydown', closePictureUploadModal);
  pictureUploadModalCloseButton.addEventListener('click', closePictureUploadModal);
  pictureUploadForm.addEventListener('submit', setFormSubmitHandler);
  scaleControlValue.value = '100%';
  pictureUploadPreview.style.transform = 'scale(1)';
  effectLevelSlider.classList.add('hidden');
};

pictureUploadButton.addEventListener('change', uploadPicture);
pictureUploadButton.addEventListener('change', openPictureUploadModal);
