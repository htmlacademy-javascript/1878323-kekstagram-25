import {GET_URL, SEND_URL} from './constants.js';


/**
 * Получает данные с сервера, проверяет на корректность и отправляет дальше по цепочке промисов
 * @param {callback} onSuccess — действие при успешном получении данных с сервера
 * @param {callback} onFail — действие при сбое получения данных
 */
const getData = (onSuccess, onFail) => {
  fetch(GET_URL)
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
const sendData = (onSuccess, onFail, body) => {
  fetch(SEND_URL,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      mode: 'no-cors',
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
