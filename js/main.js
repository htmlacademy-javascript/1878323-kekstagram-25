// import  './big-picture.js';
import {createItemPicture} from './picture.js';
import {createPosts} from './data.js';

const postsList= createPosts();
const pictureList = document.querySelector('.pictures');
const pictureListFragment = document.createDocumentFragment();

const createPictureList = () => {
  postsList.forEach((picture) => {
    pictureListFragment.append(createItemPicture(picture));
  });
  return pictureListFragment;
};



pictureList.append(createPictureList());
