import {checkEscapeKey, checkMouseClick, toggleClass} from './utils.js';

const COMMENT_PICTURE_WEIGHT = 35;  // Ширина изображения при добавлении
const COMMENT_PICTURE_HEIGHT = 35;  // Высота изображения при добавлении
const COMMENTS_PORTION = 5;  // Количество комментариев, порционно загружаемых на модалке с большой фотографией

const pageBody = document.querySelector('body');
const pictureBig = document.querySelector('.big-picture');
const pictureBigImg = pictureBig.querySelector('.big-picture__img');
const likesCount = pictureBig.querySelector('.likes-count');
const commentsCountText = pictureBig.querySelector('.comments-count');
const socialCaption = pictureBig.querySelector('.social__caption');
const socialComments = pictureBig.querySelector('.social__comments');

const bigModalCloseButton = document.querySelector('.big-picture__cancel');
const socialCommentCountNow = document.querySelector('.comments-count-now');
const socialCommentsLoader = document.querySelector('.social__comments-loader');

let shownCommentsCount = 0;
let totalCommentList = [];
let totalCommentListLength = 0;

const fillPictureBigComments = (comments) => {
  const commentsListPortion = comments.slice(shownCommentsCount, shownCommentsCount + COMMENTS_PORTION).reduce((commentsHtml, commentId) => {
    commentsHtml += `<li class="social__comment">
      <img class="social__picture" src="${commentId.avatar}" alt="${commentId.name}" width="${COMMENT_PICTURE_WEIGHT}" height="${COMMENT_PICTURE_HEIGHT}">
      <p class="social__text">${commentId.message}</p>
      </li>`;
    return commentsHtml;
  }, '');
  socialComments.insertAdjacentHTML('beforeend', commentsListPortion);
};

const socialCommentsLoaderClickHandler = (evt) => {
  evt.preventDefault();
  fillPictureBigComments(totalCommentList);
  shownCommentsCount += COMMENTS_PORTION;
  socialCommentCountNow.textContent = shownCommentsCount.toString();
  if (totalCommentListLength <= shownCommentsCount) {
    socialCommentsLoader.classList.add('hidden');
    socialCommentCountNow.textContent = totalCommentListLength.toString();
  }
};

const fillPictureBig = (picture) => {
  likesCount.textContent = picture.likes.toString();
  pictureBigImg.querySelector('img').src = picture.url;
  commentsCountText.textContent = totalCommentListLength.toString();
  socialCaption.textContent = picture.description;
  fillPictureBigComments(picture.comments);


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
  toggleClass(pageBody, 'modal-open', isHidden);
  socialComments.innerHTML = '';
};

const documentKeydownHandler = (evt) => {
  evt.preventDefault();
  if (checkEscapeKey(evt) || checkMouseClick(evt)) {
    closePictureModal();
  }
};

const bigModalCloseButtonClickHandler = (evt) => {
  evt.preventDefault();
  closePictureModal();
};

const documentClickHandler = (evt) => {
  evt.preventDefault();
  closePictureModal();
};


function closePictureModal() {
  tooglePictureModal(false);
  document.removeEventListener('keydown', documentKeydownHandler);
  document.removeEventListener('click', documentClickHandler);
  bigModalCloseButton.removeEventListener('click', bigModalCloseButtonClickHandler);
  socialCommentsLoader.removeEventListener('click', socialCommentsLoaderClickHandler);
  shownCommentsCount = 0;
  socialCommentsLoader.classList.remove('hidden');
}

const openPictureModal = (picture) => {
  socialCommentsLoader.addEventListener('click', socialCommentsLoaderClickHandler);
  totalCommentList = picture.comments;
  totalCommentListLength = totalCommentList.length;
  tooglePictureModal(true);
  fillPictureBig(picture);
  document.addEventListener('keydown', documentKeydownHandler);
  bigModalCloseButton.addEventListener('click', bigModalCloseButtonClickHandler);
};

export {openPictureModal};
