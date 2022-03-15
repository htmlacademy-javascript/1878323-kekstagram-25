import {isEscapeKey, toggleClass} from './utils.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCountText = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const cancel = document.querySelector('.big-picture__cancel');

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
  commentsCountText.textContent = picture.comments.length;
  socialCaption.textContent = picture.description;
  fillBigPictureComments (picture.comments);

};

// const onPopupEscKeydown = (evt) => {
//   if (isEscapeKey(evt)) {
//     evt.preventDefault();
//     closePictureModal();
//   }
// };

const tooglePictureModal = (isHidden) => {
  toggleClass(bigPicture,'hidden', !isHidden);
  toggleClass(socialCommentCount,'hidden', isHidden);
  toggleClass(socialCommentsLoader,'hidden', isHidden);
  toggleClass(body,'modal-open', isHidden);
  socialComments.innerHTML = '';
};

const openPictureModal = (picture) => {
  tooglePictureModal(true);
  fillBigPicture(picture);
  document.addEventListener('keydown', onPopupEscKeydown);
};

const closePictureModal = () => {
  tooglePictureModal(false);
  document.removeEventListener('keydown', onPopupEscKeydown);
};

cancel.addEventListener('click', () => {
  closePictureModal();
});

function onPopupEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }

}

export {fillBigPicture, openPictureModal, closePictureModal};
