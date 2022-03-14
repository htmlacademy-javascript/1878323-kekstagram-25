import {/*isEscapeKey,*/ isEnterKey} from './utils.js';
import {createPosts} from './data.js';
import {createItemPicture} from './picture.js';
import {openPictureModal, closePictureModal} from './big-picture.js';


const postsList = createPosts();
const picturesList = document.querySelector('.pictures');
const pictureListFragment = document.createDocumentFragment();
const cancel = document.querySelector('.big-picture__cancel');

const createPictureList = () => {
  postsList.forEach((picture) => {
    pictureListFragment.append(createItemPicture(picture));
  });
  return pictureListFragment;
};

picturesList.append(createPictureList());


picturesList.querySelectorAll('.picture').forEach(( item, i ) => {

  item.addEventListener( 'click', () => {
    console.log(postsList[i]);
    openPictureModal(postsList[i]);
  });

  item.addEventListener('keydown', (evt) => {
    if (isEnterKey(evt)) {
      openPictureModal(postsList[i]);
    }
  });
});

cancel.addEventListener('click', () => {
  closePictureModal();
});

cancel.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closePictureModal();
  }
});

// console.log( item, i, e );
// // item - ссылка на елемент
// // i - порядочный номер элемента (начиная с 0)
// // e - объект ивента
