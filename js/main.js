import {getData} from './fetch.js';
import {renderPictureList} from './picture.js';
import {showErrorLoadingModal} from './modal-messages.js';

import './picture-upload.js';
import './validate.js';

getData(
  (data) => {
    renderPictureList(data);
  },
  showErrorLoadingModal
);
