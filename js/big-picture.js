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

const COMMENTIMGWEIGHT = 35;
const COMMENTIMGHEIGHT = 35;

const fillBigPicture = (picture) => {
  likesCount.textContent = picture.likes;
  bigPictureImg.querySelector('img').src = picture.url;
  commentsCountText.textContent = picture.comments.length;
  socialCaption.textContent = picture.description;

  picture.comments.forEach((commentID) => {

    const pictureCommentsList = document.createElement('li');
    const pictureCommentImg = document.createElement('img');
    const pictureCommentText = document.createElement('p');

    pictureCommentsList.classList.add('social__comment');
    pictureCommentImg.classList.add('social__picture');

    pictureCommentImg.src = commentID.avatar;
    pictureCommentImg.alt = commentID.name;
    pictureCommentImg.width = COMMENTIMGWEIGHT;
    pictureCommentImg.height= COMMENTIMGHEIGHT;
    pictureCommentText.classList.add('social__text');

    pictureCommentText.textContent = commentID.message;
    pictureCommentsList.append(pictureCommentImg);
    pictureCommentsList.append(pictureCommentText);

    socialComments.append(pictureCommentsList);
  });
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};

const tooglePictureModel = (booleanValue) => {
  toggleClass(bigPicture,'hidden',!booleanValue);
  toggleClass(socialCommentCount,'hidden',booleanValue);
  toggleClass(socialCommentsLoader,'hidden',booleanValue);
  toggleClass(body,'modal-open',booleanValue);
  socialComments.innerHTML = '';
};

const openPictureModal = (picture) => {
  tooglePictureModel (true);
  fillBigPicture(picture);
  document.addEventListener('keydown', onPopupEscKeydown);
};

const closePictureModal = () => {
  tooglePictureModel (false);
  document.removeEventListener('keydown', onPopupEscKeydown);
};

cancel.addEventListener('click', () => {
  closePictureModal();
});

export {fillBigPicture, openPictureModal, closePictureModal};
