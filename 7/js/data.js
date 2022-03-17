import {getRandomArrayElement, getRandomPositiveInteger, shuffleArray, createArrayConsistentNumbers} from './utils.js';
import {COMMENTS, DESCRIPTION, NAMES} from './constants.js';

const PHOTOS_COUNT = 25;
const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;
const MIN_COMMENTS_ID = 1;
const MAX_COMMENTS_ID = 20;
const MIN_LIKES_ID = 15;
const MAX_LIKES_ID = 200;

/**
 * Генерация URL аватара пользователя
 */
const createAvatarUrl = () => {
  const avatarId = getRandomPositiveInteger(MIN_AVATAR_ID, MAX_AVATAR_ID);
  return `img/avatar-${avatarId}.svg`;
};

/**
 * Генерация количества комментариев под загруженной картинкой
 */
const getCommentsQuantity = () => getRandomPositiveInteger(MIN_COMMENTS_ID, MAX_COMMENTS_ID);

/**
 * Заполнение одного комментария-объекта данными.
 * Используется глобальный счетчик ID, чтобы не было комментариев с одинаковым идентификатором.
 *
 * @param {number} id — счетчик ID комментария.
 * @returns {array} — массив из комментариев-объектов.
 */
const createPostsComments = (id) => ({
  id,
  avatar: createAvatarUrl(),
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES),
});

/**
 * Создание массива из комментариев-объектов.
 *
 * @returns {array} — массив из комментариев-объектов.
 */
const getCommentsData = () => Array.from({length: getCommentsQuantity()},(v, k) => createPostsComments(k));

/**
 * Заполнение одного элемента-объекта с данными для одной фотографии.
 *
 * @param {number} id — идентификатор фотографии из общего массива фотографий.
 * @returns {object} — объект с данными для одной фотографии.
 */
const createPost = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomPositiveInteger(MIN_LIKES_ID, MAX_LIKES_ID),
  comments: getCommentsData()
});

const photosRandomIdArray = shuffleArray(createArrayConsistentNumbers(1, PHOTOS_COUNT));

/**
 * Создание массива из описаний фотографий.
 *
 * @returns {array} — массив из описаний фотографий.
 */
const createPosts = () => (
  photosRandomIdArray.map((id) => (
    createPost(id)
  ))
);

// const getPost = (count) => Array.from({ length: count }, (v, k) => createPost(k+1));
// const createPosts = () => getPost(PHOTOS_COUNT);

export {createPosts};
