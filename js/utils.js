const DEBOUNCE_DELAY = 500;                                             // Пауза (в миллисекундах) перед выполнением коллбек-функции, переданной в debounce-функцию

/**
 * debounce для устранения дребезга.
 * Источник - https://www.freecodecamp.org/news/javascript-debounce-example
 *
 * @param {callback} callback — функция, выполнение которой нужно задержать на заданное время.
 * @param {number} timeoutDelay — время в миллисекундах. Пауза перед выполнением переданной функции.
 */
const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

/**
 * Перемешивание элементов массива в случайном порядке.
 *
 * @param {array} array — исходный массив.
 * @returns {array} — итоговый массив.
 */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

/**
 * Проверка, что нажата клавиша "Escape".
 */
const checkEscapeKey = (evt) => (evt.key === ('Escape' || 'Esc'));

/**
 * Предотвращение "всплытия" события нажатия клавиши "Escape".
 */
const stopEscPropagation = (evt) => {
  if (checkEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

/**
 * Переключение классов на закрытие и открытие вплывающих окон c помощью toggle.
 *
 * @param {Element} element — DOM элемент.
 * @param {string} className — наименование класса.
 * @param {boolean} isHidden — true или false.
 */
const toggleClass = (element, className, isHidden) => element.classList.toggle(className, isHidden);

export {
  debounce,
  shuffleArray,
  checkEscapeKey,
  stopEscPropagation,
  toggleClass
};
