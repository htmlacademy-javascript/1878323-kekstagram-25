const GET_URL = 'https://25.javascript.pages.academy/kekstagram/data';  // Адрес сервера для получения изображений
const SEND_URL = 'https://25.javascript.pages.academy/kekstagram';      // Адрес сервера для отправки изображений
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];                       // Разрешения изображений, доступные для отправки на сервер
const DEFAULT_PHOTO_URL = 'img/upload-default-image.jpg';               // Адрес изображения-заглушки для показа до загрузки своей фотографии
const SCALE_MIN = 25;                                                   // Минимальный масштаб, доступный при редактировании изображения
const SCALE_MAX = 100;                                                  // Максимальный масштаб, доступный при редактировании изображения
const SCALE_STEP = 25;                                                  // Шаг изменения масштаба при редактировании изображения
const PERCENT_TO_FRACTION = 100;                                        // Число для перевода процентов в доли
const RANDOM_PHOTOS_COUNT = 10;                                         // Количество изображений, отображаемых на странице при показе случайных фотографий
const COMMENTS_PORTION = 5;                                             // Количество комментариев, порционно загружаемых на модалке с большой фотографией
const HASHTAGS_MAX_COUNT = 5;                                           // Максимальное количество хэштегов, доступных для добавления к своей фотографии
const HASHTAGS_MIN_SYMBOLS = 2;                                         // Минимальная длина (в символах) хэштега, доступного для добавления к своей фотографии
const HASHTAGS_MAX_SYMBOLS = 20;                                        // Максимальная длина (в символах) хэштега, доступного для добавления к своей фотографии
const HASHTAGS_REGEX = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;                  // Регулярное выражение для проверки вводимых хэштегов
const DESCRIPTION_MAX_LENGTH = 140;                                     // Максимальная длина (в символах) комментария, добавляемого к своей фотографии
const MESSAGE_TIMEOUT = 5000;                                           // Время показа (в миллисекундах) всплывающего окошка с ошибкой получения изображений с сервера
const DEBOUNCE_DELAY = 500;                                             // Пауза (в миллисекундах) перед выполнением коллбек-функции, переданной в debounce-функцию
const COMMENT_PICTURE_WEIGHT = 35;                                      // Ширина изображения при добавлении
const COMMENT_PICTURE_HEIGHT = 35;                                      // Высота изображения при добавлении

export {
  GET_URL,
  SEND_URL,
  FILE_TYPES,
  DEFAULT_PHOTO_URL,
  SCALE_MIN,
  SCALE_MAX,
  SCALE_STEP,
  PERCENT_TO_FRACTION,
  RANDOM_PHOTOS_COUNT,
  COMMENTS_PORTION,
  HASHTAGS_MAX_COUNT,
  HASHTAGS_MIN_SYMBOLS,
  HASHTAGS_MAX_SYMBOLS,
  HASHTAGS_REGEX,
  DESCRIPTION_MAX_LENGTH,
  MESSAGE_TIMEOUT,
  DEBOUNCE_DELAY,
  COMMENT_PICTURE_HEIGHT,
  COMMENT_PICTURE_WEIGHT
};
