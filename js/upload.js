"use strict";

(() => {
  const successMessage = window.main.successMessageTemplate.cloneNode(true);
  const errorMessage = window.main.errorMessageTemplate.cloneNode(true);

  const makeRequest = (data, onSuccess, onError, url) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      onSuccess();
      switch (xhr.status) {
        case window.main.StatusCode.OK:
          onSuccess();
          break;

        default:
          onError();
      }
    });

    xhr.addEventListener(`error`, () => {
      onError();
    });

    xhr.addEventListener(`timeout`, () => {
      onError();
    });

    xhr.timeout = window.main.REQUEST_TIMEOUT;

    xhr.open(`POST`, url);
    xhr.send(data);
  };

  const clearMessage = () => {
    try {
      window.main.main.removeChild(successMessage);
    } catch (err) {
      window.main.main.removeChild(errorMessage);
    }
    document.removeEventListener(`keydown`, onEscapeButtonClick);
    document.removeEventListener(`mousedown`, onDocumentMousedownLeft);
  };

  const onEscapeButtonClick = (evt) => {
    if (window.util.isKeyEscape(evt)) {
      window.upload.clearMessage();
    }
  };

  const onDocumentMousedownLeft = (evt) => {
    if (window.util.isMousedownLeft(evt)) {
      window.upload.clearMessage();
    }
  };

  const renderSuccessMessage = () => {
    window.main.main.appendChild(window.upload.successMessage);
    document.addEventListener(`keydown`, window.upload.onEscapeButtonClick);
    document.addEventListener(`mousedown`, window.upload.onDocumentMousedownLeft);
  };

  const renderErrorMessage = () => {
    window.main.main.appendChild(window.upload.errorMessage);
    document.addEventListener(`keydown`, window.upload.onEscapeButtonClick);
    document.addEventListener(`mousedown`, window.upload.onDocumentMousedownLeft);
  };

  window.upload = {
    makeRequest: makeRequest,
    clearMessage: clearMessage,
    onEscapeButtonClick: onEscapeButtonClick,
    onDocumentMousedownLeft: onDocumentMousedownLeft,
    renderSuccessMessage: renderSuccessMessage,
    successMessage: successMessage,
    errorMessage: errorMessage,
    renderErrorMessage: renderErrorMessage,
  };

  window.main.adFromSubmit.addEventListener(`click`, (evt) => {
    if (window.validation.checkAdFormInput()) {
      evt.preventDefault();
      window.upload.makeRequest(new FormData(window.main.adForm), () => {
        window.mode.makeDisableStatus();
        window.upload.renderSuccessMessage();
      },
      () => {
        window.mode.makeDisableStatus();
        window.upload.renderErrorMessage();
      },
      window.main.Urls.UPLOAD);
    }
  });
})();
