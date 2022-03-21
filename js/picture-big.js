import {isEscapeKey, isMouseClick, toggleClass} from './utils.js';

const COMMENT_IMAGE_WEIGHT = 35;
const COMMENT_IMAGE_HEIGHT = 35;
const COMMENTS_PORTION = 5;

const bodyElement = document.querySelector('body');
const pictureBig = document.querySelector('.big-picture');
const bigPictureImg = pictureBig.querySelector('.big-picture__img');
const likesCount = pictureBig.querySelector('.likes-count');
const commentsCountText = pictureBig.querySelector('.comments-count');
const socialCaption = pictureBig.querySelector('.social__caption');
const socialComments = pictureBig.querySelector('.social__comments');

const cancelButton = document.querySelector('.big-picture__cancel');
const socialCommentCountNow = document.querySelector('.comments-count-now');
const socialCommentsLoader = document.querySelector('.social__comments-loader');

let shownCommentsCount = 0;
let totalCommentList = [];
let totalCommentListLength = 0;

const fillBigPictureComments = (comments) => {
  const commentsListPortion = comments.slice(shownCommentsCount, shownCommentsCount + COMMENTS_PORTION).reduce((commentsHtml, commentId) => {
    commentsHtml += `<li class="social__comment">
      <img class="social__picture" src="${commentId.avatar}" alt="${commentId.name}" width="${COMMENT_IMAGE_WEIGHT}" height="${COMMENT_IMAGE_HEIGHT}">
      <p class="social__text">${commentId.message}</p>
      </li>`;
    return commentsHtml;
  }, '');
  socialComments.insertAdjacentHTML('beforeEnd', commentsListPortion);
};

const loadMoreCommentHandler = (evt) => {
  evt.preventDefault();
  fillBigPictureComments(totalCommentList);

  shownCommentsCount += COMMENTS_PORTION;
  socialCommentCountNow.textContent = shownCommentsCount.toString();
  if (totalCommentListLength <= shownCommentsCount) {
    socialCommentsLoader.classList.add('hidden');
    socialCommentCountNow.textContent = totalCommentListLength.toString();
  }
};

const fillBigPicture = (picture) => {
  likesCount.textContent = picture.likes.toString();
  bigPictureImg.querySelector('img').src = picture.url;
  commentsCountText.textContent = totalCommentListLength.toString();
  socialCaption.textContent = picture.description;
  fillBigPictureComments(picture.comments);


  if (totalCommentListLength <= COMMENTS_PORTION) {
    socialCommentCountNow.textContent = totalCommentListLength.toString();
    socialCommentsLoader.classList.add('hidden');
  } else {
    socialCommentCountNow.textContent = COMMENTS_PORTION.toString();
  }
  shownCommentsCount += COMMENTS_PORTION;
};

const tooglePictureModal = (isHidden) => {
  toggleClass(pictureBig, 'hidden', !isHidden);
  toggleClass(bodyElement, 'modal-open', isHidden);
  socialComments.innerHTML = '';
};

const closePictureModal = (evt) => {
  evt.preventDefault();
  if (isEscapeKey(evt) || isMouseClick(evt)) {
    tooglePictureModal(false);
    window.removeEventListener('keydown', closePictureModal);
    cancelButton.removeEventListener('keydown', closePictureModal);
    socialCommentsLoader.removeEventListener('click', loadMoreCommentHandler);
    shownCommentsCount = 0;
    socialCommentsLoader.classList.remove('hidden');
  }
};

const openPictureModal = (picture) => {
  socialCommentsLoader.addEventListener('click', loadMoreCommentHandler);
  totalCommentList = picture.comments;
  totalCommentListLength = totalCommentList.length;
  tooglePictureModal(true);
  fillBigPicture(picture);
  window.addEventListener('keydown', closePictureModal);
  cancelButton.addEventListener('click', closePictureModal);
};

export {openPictureModal};
