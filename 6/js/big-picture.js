import {isEscapeKey} from './utils.js';
const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCountText = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');


const socialCommentCount = document.querySelector('.social__comment-count');
const socialCommentsLoader = document.querySelector('.social__comments-loader');

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
    pictureCommentImg.width = 35;
    pictureCommentImg.height= 35;
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

const openPictureModal = (picture) => {
  bigPicture.classList.remove('hidden');
  socialComments.innerHTML = '';
  socialCommentCount.classList.add('hidden');
  socialCommentsLoader.classList.add('hidden');
  body.classList.add('modal-open');
  fillBigPicture(picture);

  document.addEventListener('keydown', onPopupEscKeydown);
};

const closePictureModal = () => {
  bigPicture.classList.add('hidden');
  socialComments.innerHTML = '';
  socialCommentCount.classList.remove('hidden');
  socialCommentsLoader.classList.remove('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
};

export {fillBigPicture, openPictureModal, closePictureModal};
