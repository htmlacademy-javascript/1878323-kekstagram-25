const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;

const scaleControlValue = document.querySelector('.scale__control--value');
const pictureUploadPreview = document.querySelector('.img-upload__preview img');
const pictureUploadScale = document.querySelector('.img-upload__scale');

let scaleValue = SCALE_MAX;

const pictureScaleClickHandler = (evt) => {
  if (evt.target.classList.contains('scale__control--smaller')) {
    scaleValue -= SCALE_STEP;
  }

  if (evt.target.classList.contains('scale__control--bigger')) {
    scaleValue += SCALE_STEP;
  }

  if (scaleValue < SCALE_MIN) {
    scaleValue = SCALE_MIN;
  }

  if (scaleValue > SCALE_MAX) {
    scaleValue = SCALE_MAX;
  }

  scaleControlValue.value = `${scaleValue}%`;
  pictureUploadPreview.style.transform = `scale(${(scaleValue / 100)})`;
};

pictureUploadScale.addEventListener('click', pictureScaleClickHandler);
