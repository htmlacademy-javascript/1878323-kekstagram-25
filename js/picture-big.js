import {isEscapeKey, isMouseClick, toggleClass} from './utils.js';

const bodyElement = document.querySelector('body');
const pictureBig = document.querySelector('.big-picture');
const bigPictureImg = pictureBig.querySelector('.big-picture__img');
const likesCount = pictureBig.querySelector('.likes-count');
const commentsCountText = pictureBig.querySelector('.comments-count');
const socialCaption = pictureBig.querySelector('.social__caption');
const socialComments = pictureBig.querySelector('.social__comments');
const cancelButton = document.querySelector('.big-picture__cancel');

const socialCommentCount = document.querySelector('.social__comment-count');
const socialCommentsLoader = document.querySelector('.social__comments-loader');

const COMMENT_IMAGE_WEIGHT = 35;
const COMMENT_IMAGE_HEIGHT = 35;

const fillBigPictureComments = (comments) => {
  let commentsHtml = '';
  comments.forEach((commentId) => {
    commentsHtml += `<li class="social__comment">
      <img class="social__picture" src="${commentId.avatar}" alt="${commentId.name}" width="${COMMENT_IMAGE_WEIGHT}" height="${COMMENT_IMAGE_HEIGHT}">
      <p class="social__text">${commentId.message}</p>
      </li>`;
  });
  socialComments.innerHTML = commentsHtml;
};

const fillBigPicture = (picture) => {
  likesCount.textContent = picture.likes;
  bigPictureImg.querySelector('img').src = picture.url;
  commentsCountText.textContent = picture.comments.length.toString();
  socialCaption.textContent = picture.description;
  fillBigPictureComments (picture.comments);

};

const tooglePictureModal = (isHidden) => {
  toggleClass(pictureBig,'hidden', !isHidden);
  toggleClass(socialCommentCount,'hidden', isHidden);
  toggleClass(socialCommentsLoader,'hidden', isHidden);
  toggleClass(bodyElement,'modal-open', isHidden);
  socialComments.innerHTML = '';
};

const closePictureModal = (evt) => {
  evt.preventDefault();
  if (isEscapeKey(evt) || isMouseClick(evt)) {
    tooglePictureModal(false);
    closePictureModal();
    window.removeEventListener('keydown', closePictureModal);
    cancelButton.removeEventListener('keydown', closePictureModal);
  }
};

const openPictureModal = (picture) => {
  tooglePictureModal(true);
  fillBigPicture(picture);
  window.addEventListener('keydown', closePictureModal);
  cancelButton.addEventListener('click', closePictureModal);
};

export {fillBigPicture, openPictureModal, closePictureModal};
