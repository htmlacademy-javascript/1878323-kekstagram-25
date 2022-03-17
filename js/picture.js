const pictureTemplate = document.querySelector('#picture').content;
const newItemPicture = pictureTemplate.querySelector('.picture');

/**
 * Создание HTML структуры отображения превью картинок .
 *
 * @param {array} picture - Объект превью фотографии
 * @returns {array} — HTML структура превью фотографии.
 */

const createItemPicture = (picture) => {
  const copyItemPicture = newItemPicture.cloneNode(true);
  copyItemPicture.querySelector('img').src = picture.url;
  copyItemPicture.querySelector('.picture__likes').textContent = picture.likes.toString();
  copyItemPicture.querySelector('.picture__comments').textContent = picture.comments.length.toString();

  return copyItemPicture;
};

export {createItemPicture};
