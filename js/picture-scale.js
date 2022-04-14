const SCALE_MIN = 25;  // Минимальный масштаб, доступный при редактировании изображения
const SCALE_MAX = 100;  // Максимальный масштаб, доступный при редактировании изображения
const SCALE_STEP = 25;  // Шаг изменения масштаба при редактировании изображения
const PERCENT_TO_FRACTION = 100;  // Число для перевода процентов в доли

const scaleControlValue = document.querySelector('.scale__control--value');
const pictureUploadPreview = document.querySelector('.img-upload__preview img');
const pictureUploadScale = document.querySelector('.img-upload__scale');

let scaleValue = SCALE_MAX;

const pictureScaleClickHandler = (evt) => {
  if (evt.target.classList.contains('scale__control--smaller')) {
    scaleValue -= SCALE_STEP;
  } else if (evt.target.classList.contains('scale__control--bigger')) {
    scaleValue += SCALE_STEP;
  }

  if (scaleValue < SCALE_MIN) {
    scaleValue = SCALE_MIN;
  } else if (scaleValue > SCALE_MAX) {
    scaleValue = SCALE_MAX;
  }

  scaleControlValue.value = `${scaleValue}%`;
  pictureUploadPreview.style.transform = `scale(${(scaleValue / PERCENT_TO_FRACTION)})`;
};

pictureUploadScale.addEventListener('click', pictureScaleClickHandler);
