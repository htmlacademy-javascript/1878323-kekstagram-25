import {stopEscPropagation} from './utils.js';

const HASHTAGS_MAX_COUNT = 5;
const HASHTAGS_MIN_SYMBOLS = 2;
const HASHTAGS_MAX_SYMBOLS = 20;
const HASHTAGS_REGEX = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;
const DESCRIPTION_MAX_LENGTH = 140;

const imageUploadForm = document.querySelector('.img-upload__form');
const hashtagsElement = imageUploadForm.querySelector('.text__hashtags');
const commentElement = imageUploadForm.querySelector('.text__description');

/**
 * Разбиение строки с хэштегами на массив из отдельных хэштегов.
 * Все символы в строке переводятся в нижний регистр для более корректного сравнения хэштегов друг с другом.
 * Разделение хэштегов друг от друга происходит по символу пробела.
 * Удаляются (если есть) пробелы по краям и следующие друг за другом.
 *
 * @param {string} hashtagsString — строка из хэштегов.
 * @return {array} — массив из отдельных хэштегов.
 */
const splitHashtags = (hashtagsString) => (
  hashtagsString.trim().toLowerCase().split(' ').filter((tag) => (tag !== ''))
);

/**
 * Проверка, начинается ли хэштег с символа решетки (#).
 */
const validateStartHash = (value) => (
  splitHashtags(value).every((tag) => (tag.startsWith('#')))
);

/**
 * Проверка, не состоит ли хэштег только из символа решетки (#).
 */
const validateTagOnlyHash = (value) => (
  !(splitHashtags(value).some((tag) => (tag.startsWith('#') && tag.length === 1)))
);

/**
 * Проверка на превышение количества хэштегов.
 */
const validateTagsCount = (value) => (
  splitHashtags(value).length <= HASHTAGS_MAX_COUNT
);

/**
 * Проверка на наличие повторяющихся хэштегов.
 */
const validateTagsDuplicate = (value) => {
  const hashtags = splitHashtags(value);
  return !(hashtags.some((tag, index) => hashtags.indexOf(tag) !== index));
};

/**
 * Проверка на минимальную и максимальную длину хэштега.
 */
const validateTagLength = (value) => (
  splitHashtags(value).every((tag) => (tag.length >= HASHTAGS_MIN_SYMBOLS && tag.length <= HASHTAGS_MAX_SYMBOLS))
);

/**
 * Проверка хэштегов на соответствие регулярному выражению.
 */
const validateTagRegEx = (value) => (
  splitHashtags(value).every((tag) => (tag.match(HASHTAGS_REGEX)))
);

/**
 * Проверка хэштегов на соответствие регулярному выражению.
 */
const validateDescriptionLength = (value) => (
  value.length <= DESCRIPTION_MAX_LENGTH
);

const validatePristine = new Pristine(imageUploadForm, {
  classTo: 'text__label',
  errorClass: 'text__label--invalid',
  successClass: 'text__label--valid',
  errorTextParent: 'text__label',
  errorTextTag: 'span',
  errorTextClass: 'text__label--error'
});

hashtagsElement.addEventListener('keydown', stopEscPropagation);
commentElement.addEventListener('keydown', stopEscPropagation);

validatePristine.addValidator(hashtagsElement, validateStartHash, 'Хэштег должен начинаться с символа решётки (#)');
validatePristine.addValidator(hashtagsElement, validateTagOnlyHash, 'Хэштег не должен состоять только из символа решётки (#)');
validatePristine.addValidator(hashtagsElement, validateTagsCount, `Не больше ${HASHTAGS_MAX_COUNT} хэштегов`);
validatePristine.addValidator(hashtagsElement, validateTagsDuplicate, 'Хэштеги не должны повторяться');
validatePristine.addValidator(hashtagsElement, validateTagLength, `Длина хэштега - от ${HASHTAGS_MIN_SYMBOLS} до ${HASHTAGS_MAX_SYMBOLS} символов, включая решётку`);
validatePristine.addValidator(hashtagsElement, validateTagRegEx, 'Хештег должен состоять только из букв и цифр');
validatePristine.addValidator(commentElement, validateDescriptionLength, `Максимальная длина комментария - ${DESCRIPTION_MAX_LENGTH} символов`);

imageUploadForm.addEventListener('submit', (evt) => {
  if (!validatePristine.validate()) {
    evt.preventDefault();
  }
});

export {validatePristine};
