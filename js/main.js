import {createItemPicture} from './picture.js';
import {createPosts} from './data.js';
const pictureList = document.querySelector('.pictures');
const itemPictureDescriptions = createPosts();
const pictureListFragment = document.createDocumentFragment();

const createPictureListArray = () => {
  itemPictureDescriptions.forEach((picture) => {
    pictureListFragment.append(createItemPicture(picture));
  });
  return pictureListFragment;
};

pictureList.append(createPictureListArray());
