import {isEscapeKey, isMouseClick, toggleClass} from './utils.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_PHOTO_URL = 'img/upload-default-picture.jpg';

const bodyElement = document.querySelector('body');
const pictureUploadForm = document.querySelector('.img-upload__form');
const pictureUploadButton = pictureUploadForm.querySelector('.img-upload__start input[type=file]');
const pictureUploadModal = pictureUploadForm.querySelector('.img-upload__overlay');
const pictureUploadPreview = pictureUploadModal.querySelector('.img-upload__preview img');
const pictureUploadModalCloseButton = pictureUploadModal.querySelector('.img-upload__cancel');

/**
 * Загрузка собственного изображения и подстановка в модальное окно.
 * При выборе файла с неподходящим разрешением показывается фото-заглушка.
 */
const uploadPicture = () => {
  const file = pictureUploadButton.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => (fileName.endsWith(it)));
  if (matches) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      pictureUploadPreview.src = reader.result;
    });
  } else {
    pictureUploadPreview.src = DEFAULT_PHOTO_URL;
  }
};

pictureUploadButton.addEventListener('change', uploadPicture);

const toogleUploadPictureModal = (isHidden) => {
  toggleClass(bodyElement,'modal-open', isHidden);
  toggleClass(pictureUploadModal,'hidden', !isHidden);
};

/**
 * Закрытие модального окна и очищение полей формы до состояния по-умолчанию.
 */
const closePictureUploadModal = (evt) => {
  if (isEscapeKey(evt) || isMouseClick(evt)) {
    toogleUploadPictureModal(false);
    pictureUploadForm.reset();
    pictureUploadButton.value = '';
    document.removeEventListener('keydown', closePictureUploadModal);
    pictureUploadModalCloseButton.removeEventListener('click', closePictureUploadModal);
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
};

pictureUploadButton.addEventListener('change', openPictureUploadModal);
