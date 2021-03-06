import {stopEscPropagation} from './utils.js';

const HASHTAGS_MAX_COUNT = 5;  // Максимальное количество хэштегов, доступных для добавления к своей фотографии
const HASHTAGS_MIN_SYMBOLS = 2;  // Минимальная длина (в символах) хэштега, доступного для добавления к своей фотографии
const HASHTAGS_MAX_SYMBOLS = 20;  // Максимальная длина (в символах) хэштега, доступного для добавления к своей фотографии
const HASHTAGS_REGEX = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;  // Регулярное выражение для проверки вводимых хэштегов
const DESCRIPTION_MAX_LENGTH = 140;  // Максимальная длина (в символах) комментария, добавляемого к своей фотографии

const imageUploadForm = document.querySelector('.img-upload__form');
const hashtagsText = imageUploadForm.querySelector('.text__hashtags');
const commentText = imageUploadForm.querySelector('.text__description');

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

const getValidateHashText = (value) => {
  let message;
  if (!validateStartHash(value)) {
    message = 'Хэштег должен начинаться с символа решётки (#)';
  } else if (!validateTagOnlyHash(value)) {
    message = 'Хэштег не должен состоять только из символа решётки (#) ';
  } else if (!validateTagsCount(value)) {
    message = `Не больше ${HASHTAGS_MAX_COUNT} хэштегов`;
  } else if (!validateTagsDuplicate(value)) {
    message = 'Хэштеги не должны повторяться';
  } else if (!validateTagLength(value)) {
    message = `Длина хэштега - от ${HASHTAGS_MIN_SYMBOLS} до ${HASHTAGS_MAX_SYMBOLS} символов, включая решётку`;
  } else if (!validateTagRegEx(value)) {
    message = 'Хештег должен состоять только из букв и цифр';
  }
  return message;
};

const getValidateHashStatus = (value) => validateStartHash(value) && validateTagOnlyHash(value) && validateTagsCount(value) && validateTagsDuplicate(value) && validateTagLength(value) && validateTagRegEx(value);

const pristine = new Pristine(imageUploadForm, {
  classTo: 'text__label',
  errorClass: 'text__label--invalid',
  successClass: 'text__label--valid',
  errorTextParent: 'text__label',
  errorTextTag: 'span',
  errorTextClass: 'text__label--error'
});

pristine.addValidator(commentText, validateDescriptionLength, `Максимальная длина комментария - ${DESCRIPTION_MAX_LENGTH} символов`);
pristine.addValidator(hashtagsText, getValidateHashStatus, getValidateHashText);

hashtagsText.addEventListener('keydown', stopEscPropagation);
commentText.addEventListener('keydown', stopEscPropagation);

export {pristine};
