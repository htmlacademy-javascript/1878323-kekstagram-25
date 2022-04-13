import {openPictureModal} from './picture-big.js';

const pictureTemplate = document.querySelector('#picture').content;
const newItemPicture = pictureTemplate.querySelector('.picture');
const picturesList = document.querySelector('.pictures');
const pictureListFragment = document.createDocumentFragment();

/**
 * Создание HTML структуры отображения превью картинок .
 *
 * @param {array} picture - Объект превью фотографии
 * @returns {Node} — HTML структура превью фотографии.
 */

const createItemPicture = (picture) => {
  const copyItemPicture = newItemPicture.cloneNode(true);
  copyItemPicture.querySelector('img').src = picture.url;
  copyItemPicture.querySelector('.picture__likes').textContent = picture.likes.toString();
  copyItemPicture.querySelector('.picture__comments').textContent = picture.comments.length.toString();
  return copyItemPicture;
};

const renderPictureList = (data) => {
  data.forEach((picture) => {
    pictureListFragment.append(createItemPicture(picture));
  });
  picturesList.append(pictureListFragment);
  picturesList.querySelectorAll('.picture').forEach((item, i) => {
    item.addEventListener('click', () => {
      openPictureModal(data[i]);
    });
  });
};

export {renderPictureList};
