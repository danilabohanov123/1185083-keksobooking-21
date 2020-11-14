"use strict";

(() => {
  const onError = (message) => {
    const errorMessage = document.createElement(`section`);
    const errorMessageTitle = document.createElement(`h2`);
    errorMessageTitle.textContent = message;
    errorMessageTitle.style.fontSize = `50px`;
    errorMessage.appendChild(errorMessageTitle);
    errorMessage.style.zIndex = 50;
    errorMessage.style.position = `fixed`;
    errorMessage.style.top = 0;
    errorMessage.style.right = 0;
    errorMessage.style.bottom = 0;
    errorMessage.style.left = 0;
    errorMessage.style.margin = `auto`;
    errorMessage.style.backgroundColor = `#fff`;
    errorMessage.style.padding = `30px`;
    window.main.body.insertBefore(errorMessage, window.main.body.querySelector(`#card`));
    window.main.body.removeChild(window.main.body.querySelector(`main`));
    window.main.body.removeChild(window.main.body.querySelector(`footer`));
  };

  const onSuccess = (message) => {
    window.load.announcementsList = message;
    window.map.renderPins();
  };

  const makeRequest = (url) => {
    var xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      var error;
      switch (xhr.status) {
        case 200:
          window.load.onSuccess(xhr.response);
          break;

        case 400:
          error = `Неверный запрос`;
          break;
        case 401:
          error = `Пользователь не авторизован`;
          break;
        case 404:
          error = `Ничего не найдено`;
          break;

        default:
          error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
      }

      if (error) {
        window.load.onError(error);
      }
    });

    xhr.addEventListener(`error`, () => {
      window.load.onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      window.load.onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс. Проверьте интернет соединение или перезагрузите страницу`);
    });

    xhr.timeout = 10000;

    xhr.open(`GET`, url);
    xhr.send();
  };

  window.load = {
    makeRequest: makeRequest,
    onError: onError,
    onSuccess: onSuccess,
    announcementsList: []
  };

  window.load.makeRequest(window.main.URL);
})();
