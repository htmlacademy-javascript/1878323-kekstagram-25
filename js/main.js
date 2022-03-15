import './upload-picture.js';
import {createPosts} from './data.js';
import {createItemPicture} from './picture.js';
import {openPictureModal} from './big-picture.js';

const postsList = createPosts();
const picturesList = document.querySelector('.pictures');
const pictureListFragment = document.createDocumentFragment();

const createPictureList = () => {
  postsList.forEach((picture) => {
    pictureListFragment.append(createItemPicture(picture));
  });
  return pictureListFragment;
};

picturesList.append(createPictureList());

picturesList.querySelectorAll('.picture').forEach(( item, i ) => {
  item.addEventListener('click', () => {
    openPictureModal(postsList[i]);
  });
});
