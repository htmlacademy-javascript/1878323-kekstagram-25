const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;

const pictureUploadPreview = document.querySelector('.img-upload__preview img');
const scaleControlValue = document.querySelector('.scale__control--value');

let scaleValue = 100;

const pictureScaleClickHandler = (evt) => {
  if (evt.target.classList.contains('scale__control--smaller')) {
    scaleValue -= SCALE_STEP;
  }

  if (evt.target.classList.contains('scale__control--bigger')) {
    scaleValue += SCALE_STEP;
  }

  if (scaleValue < 25) {
    scaleValue = SCALE_MIN;
  }

  if (scaleValue > SCALE_MAX) {
    scaleValue = SCALE_MAX;
  }

  scaleControlValue.value = `${scaleValue}%`;
  scaleControlValue.setAttribute('value', `${scaleValue}%`);
  pictureUploadPreview.style.transform = `scale(${(scaleValue / 100)})`;
};

export {
  pictureScaleClickHandler
};
