const pictureTemplate = document.querySelector('#picture').content;
const newItemPicture = pictureTemplate.querySelector('.picture');

const createItemPicture = (picture) => {
  const copyItemPicture = newItemPicture.cloneNode(true);
  copyItemPicture.querySelector('img').src = picture.url;
  copyItemPicture.querySelector('.picture__likes').textContent = picture.likes;
  copyItemPicture.querySelector('.picture__comments').textContent = picture.comments.length;
  return copyItemPicture;
};

export {createItemPicture};
