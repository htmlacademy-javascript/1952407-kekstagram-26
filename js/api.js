import { renderPhotos } from './generate-thumbnails.js';
import { showAlert } from './util.js';

const allertMessage = 'Не удалось отобразить ленту. Попробуйте перезагрузить страницу.';

// запрос данных с сервера
const getData = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((usersPhotosData) => {
      onSuccess(usersPhotosData);
    })
    .catch(() => {
      onFail();
    });
};

getData((usersPhotosData) => {
  renderPhotos(usersPhotosData);
}, () => {
  showAlert(allertMessage);
});

// отправка данных на сервер. загрузка новых фотографий
const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  })
    .catch(() => {
      onFail();
    });
};

export { sendData };
