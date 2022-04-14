const GET_URL = 'https://25.javascript.pages.academy/kekstagram/data';  // Адрес сервера для получения изображений
const SEND_URL = 'https://25.javascript.pages.academy/kekstagram';  // Адрес сервера для отправки изображений

/**
 * Получает данные с сервера, проверяет на корректность и отправляет дальше по цепочке промисов
 * @param {callback} onSuccess — действие при успешном получении данных с сервера
 * @param {callback} onFail — действие при сбое получения данных
 */
const getData = async (onSuccess, onFail) => {
  await fetch(GET_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    }
    )
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail();
    });
};

/**
 * Принимает данные, проверяет на корректность и отправляет на указанный сервер
 * @param {callback} onSuccess — действие при успешной выгрузке данных
 * @param {callback} onFail — действие при сбое выгрузки данных
 * @param {Object} body — данные для выгрузки на сервер
 */
const sendData = async (onSuccess, onFail, body) => {
  await fetch(SEND_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        return onSuccess();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
