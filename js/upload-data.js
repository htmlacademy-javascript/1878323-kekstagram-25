import {getRandomArrayElement, getRandomPositiveInteger} from './utils.js';
import {COMMENTS, DESCRIPTION, NAMES} from './constants.js';

const MAX_POST_ID = 25;
const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;
const MIN_COMMENTS_ID = 1;
const MAX_COMMENTS_ID = 5;
const MIN_LIKES_ID = 15;
const MAX_LIKES_ID = 200;

let commentId = 1;
let postId = 1;

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

export {similarPosts};
