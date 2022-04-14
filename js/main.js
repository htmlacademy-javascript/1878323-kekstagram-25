import {getData} from './fetch.js';
import {renderPictureList} from './picture.js';
import {renderFilteredPicture} from './filters.js';
import {showModal} from './modal-messages.js';
import './picture-upload.js';
import './validate.js';

getData(
  (data) => {
    renderPictureList(data);
    renderFilteredPicture(data);
  },
  () => {
    showModal('errorLoadingModal');
  }
);
