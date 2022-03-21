const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;

const pictureUploadPreview = document.querySelector('.img-upload__preview img');
const scaleControlValue = document.querySelector('.scale__control--value');
const pictureUploadScale = document.querySelector('.img-upload__scale');

let scaleValue = SCALE_MAX;

const pictureScaleClickHandler = (evt) => {
  if (evt.target.classList.contains('scale__control--smaller')) {
    scaleValue -= SCALE_STEP;
  }

  if (evt.target.classList.contains('scale__control--bigger')) {
    scaleValue += SCALE_STEP;
  }

  scaleValue = scaleValue < SCALE_MIN ? SCALE_MIN : SCALE_MAX;

  scaleControlValue.value = `${scaleValue}%`;
  pictureUploadPreview.style.transform = `scale(${(scaleValue / 100)})`;
};

pictureUploadScale.addEventListener('click', pictureScaleClickHandler);


