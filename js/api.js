const allertMessage = 'Не удалось отобразить ленту. Попробуйте перезагрузить страницу.';

// запрос данных с сервера
const getData = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      if (!response.ok) {
        throw new Error(allertMessage);
      }
    })
    .then((usersPhotosData) => {
      onSuccess(usersPhotosData);
    })
    .catch((error) => {
      onFail(error);
    });
};

// отправка данных на сервер. загрузка новых фотографий
const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      }
      if (!response.ok) {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { getData, allertMessage, sendData };
