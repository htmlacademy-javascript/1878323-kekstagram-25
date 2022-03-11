import {createPosts} from './data.js';

const pictureTemplate = document.querySelector('#picture').content;
const newItemPicture = pictureTemplate.querySelector('.picture');
const itemPictureDescriptions = createPosts();
const pictureListFragment = document.createDocumentFragment();

const createPictureListArray = () => {
  itemPictureDescriptions.forEach((picture) => {
    const copyItemPicture = newItemPicture.cloneNode(true);
    copyItemPicture.querySelector('img').src = picture.url;
    copyItemPicture.querySelector('.picture__likes').textContent = picture.likes;
    copyItemPicture.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureListFragment.append(copyItemPicture);
  });
  return pictureListFragment;
};

export {createPictureListArray};
