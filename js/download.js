"use strict";

(() => {
  const onError = (message) => {
    const errorMessage = document.createElement(`section`);
    const errorMessageTitle = document.createElement(`h2`);
    errorMessageTitle.textContent = message;
    errorMessage.appendChild(errorMessageTitle);
    window.main.body.insertBefore(errorMessage, window.main.body.querySelector(`#card`));
    window.main.body.removeChild(window.main.body.querySelector(`main`));
    window.main.body.removeChild(window.main.body.querySelector(`footer`));
  };

  const onSuccess = (message) => {
    window.download.announcements = message;
    window.main.isDataDownload = true;
    window.mode.enableFormFieldsets(window.main.mapFiltersFieldsets);
    window.mode.enableFormFieldsets(window.main.mapFiltersSelects);
    window.filter.rerenderPins();
  };

  const makeRequest = (url) => {
    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      let error;
      switch (xhr.status) {
        case window.main.Statuses.OK:
          window.download.onSuccess(xhr.response);
          break;

        case window.main.Statuses.BAD_REQUEST:
          error = `Неверный запрос`;
          break;
        case window.main.Statuses.UNAUTHORIZED:
          error = `Пользователь не авторизован`;
          break;
        case window.main.Statuses.NOT_FOUND:
          error = `Ничего не найдено`;
          break;

        default:
          error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
      }

      if (error) {
        window.download.onError(error);
      }
    });

    xhr.addEventListener(`error`, () => {
      window.download.onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      window.download.onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс. Проверьте интернет соединение или перезагрузите страницу`);
    });

    xhr.timeout = window.main.REQUEST_TIMEOUT;

    xhr.open(`GET`, url);
    xhr.send();
  };

  window.download = {
    makeRequest: makeRequest,
    onError: onError,
    onSuccess: onSuccess,
    announcements: []
  };

  window.download.makeRequest(window.main.Urls.DOWNLOAD);
})();
