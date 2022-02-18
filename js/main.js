//Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomArbitrary = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min);

//Функция для проверки максимальной длины строки
const isStringLength = (string, maxLength) => (string.length <= maxLength);
