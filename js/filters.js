import {debounce, shuffleArray} from './utils.js';
import {renderPictureList} from './picture.js';

const RANDOM_PHOTOS_COUNT = 10;  // Количество изображений, отображаемых на странице при показе случайных фотографий

const pictureFilter = document.querySelector('.img-filters');

pictureFilter.classList.remove('img-filters--inactive');

const removeActiveClass = () => {
  const activeFilterButton = document.querySelector('.img-filters__button--active');
  activeFilterButton.classList.remove('img-filters__button--active');
};

const removePicture = () => {
  const pictures = document.querySelectorAll('.picture');
  if (pictures) {
    pictures.forEach((element) => {
      element.remove();
    });
  }
};

/**
 * Сортировка фотографий по заданным правилам.
 * Перерисовка превьюшек на основе отсортированного массива фотографий.
 *
 * @param {array} pictureArray — массив с данными по каждой фотографии.
 */
const renderFilteredPicture = (pictureArray) => {
  const filter = {
    'filter-default': () => (
      pictureArray.slice()
    ),
    'filter-random': () => (
      shuffleArray(pictureArray.slice()).slice(0, RANDOM_PHOTOS_COUNT)
    ),
    'filter-discussed': () => (
      pictureArray.slice().sort((photoA, photoB) => (
        photoB.comments.length - photoA.comments.length)
      )
    )
  };

  const pictureFilterClickHandler = (evt) => {
    if (evt.target.classList.contains('img-filters__button')) {
      removeActiveClass();
      evt.target.classList.add('img-filters__button--active');
      removePicture();
      renderPictureList(filter[evt.target.id]());
    }
  };

  pictureFilter.addEventListener('click', debounce(pictureFilterClickHandler));
};


export {renderFilteredPicture};
