const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTION = [
  'Удачный кадр',
  'Одно из лучших фото',
  'Фотографии в высоком качестве'
];

const MAX_POST_ID = 25;
const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;
const MIN_COMMENTS_ID = 1;
const MAX_COMMENTS_ID = 5;
const MIN_LIKES_ID = 15;
const MAX_LIKES_ID = 200;

let createIdGenerator = () => {
  let lastGeneratedId = 0;
  return () => lastGeneratedId++;
};

let commentId = 1;
let postId = 1;

//Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Функция для проверки максимальной длины строки
const checkStringLength = (string, length) => (string.length <= length);

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const createPostsComments = () => ({
  id: commentId++,
  avatar: `img/avatar-${getRandomPositiveInteger(MIN_AVATAR_ID, MAX_AVATAR_ID)}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES),
});

const createPosts = () => ({
  id: postId,
  url: `photos/${postId++}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomPositiveInteger(MIN_LIKES_ID, MAX_LIKES_ID),
  comments: Array.from({length: getRandomPositiveInteger(MIN_COMMENTS_ID, MAX_COMMENTS_ID)}, createPostsComments),
});

const similarPosts = () => Array.from({length: MAX_POST_ID}, createPosts);

console.log(similarPosts());