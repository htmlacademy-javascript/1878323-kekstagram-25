const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCountText = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');

const socialCommentCount = document.querySelector('.social__comment-count');
const socialCommentsLoader = document.querySelector('.social__comments-loader');

const fillBigPicture = (photo) => {
  likesCount.textContent = photo.likes;
  bigPictureImg.querySelector('img').src = photo.url;
  commentsCountText.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;

  // Оптимизировать //
  socialCommentCount.classList.add('hidden');
  socialCommentsLoader.classList.add('hidden');
  body.classList.add('modal-open');
  //  //

  photo.comments.forEach((commentID) => {

    const photoCommentsList = document.createElement('li');
    const photoCommentImg = document.createElement('img');
    const photoCommentText = document.createElement('p');
    photoCommentsList.classList.add('social__comment');

    photoCommentImg.classList.add('social__picture');

    photoCommentImg.src = commentID.avatar;
    photoCommentImg.alt = commentID.name;
    photoCommentImg.width = '35';
    photoCommentImg.height= '35';
    photoCommentText.classList.add('social__text');

    photoCommentText.textContent = commentID.message;
    photoCommentsList.append(photoCommentImg);
    photoCommentsList.append(photoCommentText);

    socialComments.innerHTML = '';
    socialComments.append(photoCommentsList);
  });
};

export {fillBigPicture};
