//Функция для проверки максимальной длины строки
const checkStringLength = (string, length) => (string.length <= length);

//Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';
const isEnterKey = (evt) => evt.key === 'Enter';

const toggleClass = (el, className, isHidden) => el.classList.toggle(className, isHidden);

export {toggleClass, checkStringLength, getRandomPositiveInteger, getRandomArrayElement, isEscapeKey, isEnterKey};
