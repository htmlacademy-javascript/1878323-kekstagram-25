import {getRandomArrayElement, getRandomPositiveInteger} from './utils.js';
import {COMMENTS, DESCRIPTION, NAMES} from './constants.js';

const PHOTOS_COUNT = 25;
const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;
const MIN_COMMENTS_ID = 1;
const MAX_COMMENTS_ID = 5;
const MIN_LIKES_ID = 15;
const MAX_LIKES_ID = 200;

const createAvatarUrl = () => {
  const avatarId = getRandomPositiveInteger(MIN_AVATAR_ID, MAX_AVATAR_ID);
  return `img/avatar-${avatarId}.svg`;
};

const createPostsComments = (id) => ({
  id,
  avatar: createAvatarUrl(),
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES),
});

const getCommentsQuantity = () => getRandomPositiveInteger(MIN_COMMENTS_ID, MAX_COMMENTS_ID);

const getCommentsData = () => Array.from({length: getCommentsQuantity()},(v, k) => createPostsComments(k));

const createPost = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomPositiveInteger(MIN_LIKES_ID, MAX_LIKES_ID),
  comments: getCommentsData()
});

const getPost = (count) => Array.from({ length: count }, (v, k) => createPost(k+1));
const createPosts = () => getPost(PHOTOS_COUNT);

export {createPosts};
