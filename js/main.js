import './picture-upload.js';
import './validate.js';
import {createPosts} from './data.js';
import {createItemPicture} from './picture.js';
import {renderPictureModal} from './picture-big.js';

const postsList = createPosts();
const picturesList = document.querySelector('.pictures');
const pictureListFragment = document.createDocumentFragment();

/**
 * Создание HTML структуры отображения превью картинок из массива объектов.
 *
 * @returns {array} — массив HTML структуры.
 */
const createPictureList = () => {
  postsList.forEach((picture) => {
    pictureListFragment.append(createItemPicture(picture));
  });
  return pictureListFragment;
};

/**
 * Добавление HTML структуры отображения превью картинок из массива.
 */
picturesList.append(createPictureList());

/**
 * Связка превью картинок на сайте и модального окна просмотра большого формата и комментариев
 */
picturesList.querySelectorAll('.picture').forEach((item, i) => {
  item.addEventListener('click', () => {
    renderPictureModal(postsList[i]);
  });
});
