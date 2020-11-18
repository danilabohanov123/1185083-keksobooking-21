"use strict";

(() => {
  const createErrorPopup = (message) => {
    const errorMessage = document.createElement(`section`);
    const errorMessageTitle = document.createElement(`h2`);
    errorMessageTitle.textContent = message;
    errorMessage.appendChild(errorMessageTitle);
    window.main.body.insertBefore(errorMessage, window.main.body.querySelector(`#card`));
    window.main.body.removeChild(window.main.body.querySelector(`main`));
    window.main.body.removeChild(window.main.body.querySelector(`footer`));
  };

  const createSuccessPopup = (message) => {
    window.download.announcements = message;
    window.main.isDataDownload = true;
    if (window.main.isEnableStatus) {
      window.mode.enableFormFieldsets(window.main.mapFiltersFieldsets);
      window.mode.enableFormFieldsets(window.main.mapFiltersSelects);
      window.filter.rerenderPins();
    }
  };

  const makeRequest = (url) => {
    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      let error;
      switch (xhr.status) {
        case window.main.StatusCode.OK:
          window.download.createSuccessPopup(xhr.response);
          break;

        case window.main.StatusCode.BAD_REQUEST:
          error = `Неверный запрос`;
          break;
        case window.main.StatusCode.UNAUTHORIZED:
          error = `Пользователь не авторизован`;
          break;
        case window.main.StatusCode.NOT_FOUND:
          error = `Ничего не найдено`;
          break;

        default:
          error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
      }

      if (error) {
        window.download.createErrorPopup(error);
      }
    });

    xhr.addEventListener(`error`, () => {
      window.download.createErrorPopup(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      window.download.createErrorPopup(`Запрос не успел выполниться за ` + xhr.timeout + `мс. Проверьте интернет соединение или перезагрузите страницу`);
    });

    xhr.timeout = window.main.REQUEST_TIMEOUT;

    xhr.open(`GET`, url);
    xhr.send();
  };

  window.download = {
    makeRequest: makeRequest,
    createErrorPopup: createErrorPopup,
    createSuccessPopup: createSuccessPopup,
    announcements: []
  };

  window.download.makeRequest(window.main.Urls.DOWNLOAD);
})();
