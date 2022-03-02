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

const createPostComments = (numberComments,numberPost) => {
  const arr = [];
  for (let i = 1; i <= numberComments; i++) {
    arr.push ({
      id: numberPost*100+i,
      avatar: `img/avatar-${getRandomPositiveInteger(1,6)}.svg`,
      message: getRandomArrayElement (COMMENTS),
      name: getRandomArrayElement (NAMES),
    });
  }
  return arr;
};

const createPosts = () => {
  const arr = [];
  for (let i = 1; i <= 25; i++) {
    arr.push ({
      id: i,
      url: `photos/${i}.jpg`,
      description: '',
      likes: getRandomPositiveInteger(15,200),
      comments: createPostComments(getRandomPositiveInteger(1,5),i),
    });
  }
  return arr;
};

checkStringLength();
createPosts();
