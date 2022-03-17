import {isEscapeKey, isMouseClick, toggleClass} from './utils.js';

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

const COMMENT_IMAGE_WEIGHT = 35;
const COMMENT_IMAGE_HEIGHT = 35;

const numToShow = 5;

const loadMoreCommentHandler = (evt) => {
  evt.preventDefault();

  const showing = [...socialComments.children].filter((chapter) => !chapter.classList.contains('hidden')).length;
  const socialCommentsNewArray = [...socialComments.children].slice(showing - 1, showing + numToShow);

  socialCommentsNewArray.forEach((child) => child.classList.remove('hidden'));

  const nowShowing = [...socialComments.children].filter((chapter) => !chapter.classList.contains('hidden')).length;

  if (nowShowing >= [...socialComments.children].length) {
    socialCommentsLoader.classList.add('hidden');
  }

  socialCommentCountNow.textContent = `${nowShowing}`;
};

const loadMoreComment = () => {

  [...socialComments.children].forEach((child) => child.classList.add('hidden'));
  socialCommentsLoader.classList.add('hidden');

  if ([...socialComments.children].length > numToShow) {
    socialCommentsLoader.classList.remove('hidden');
  }

  [...socialComments.children].slice(0, numToShow).forEach((child) => child.classList.remove('hidden'));

  socialCommentsLoader.addEventListener('click', loadMoreCommentHandler);
};


const fillBigPictureComments = (comments) => {
  socialComments.innerHTML = comments.reduce((commentsHtml, commentId) => {
    commentsHtml += `<li class="social__comment">
      <img class="social__picture" src="${commentId.avatar}" alt="${commentId.name}" width="${COMMENT_IMAGE_WEIGHT}" height="${COMMENT_IMAGE_HEIGHT}">
      <p class="social__text">${commentId.message}</p>
      </li>`;
    return commentsHtml;
  }, '');
};

const fillBigPicture = (picture) => {
  likesCount.textContent = picture.likes.toString();
  bigPictureImg.querySelector('img').src = picture.url;
  commentsCountText.textContent = picture.comments.length.toString();
  socialCaption.textContent = picture.description;
  fillBigPictureComments (picture.comments);
  loadMoreComment();

  const nowShowing = [...socialComments.children].filter((chapter) => !chapter.classList.contains('hidden')).length;
  socialCommentCountNow.textContent = `${nowShowing}`;
};

const tooglePictureModal = (isHidden) => {
  toggleClass(pictureBig,'hidden', !isHidden);
  toggleClass(bodyElement,'modal-open', isHidden);
  socialComments.innerHTML = '';
};

const closePictureModal = (evt) => {
  evt.preventDefault();
  if (isEscapeKey(evt) || isMouseClick(evt)) {
    tooglePictureModal(false);
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

export {openPictureModal};
