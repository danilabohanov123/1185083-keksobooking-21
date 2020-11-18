"use strict";

(() => {
  const isKeyEscape = (evt) => {
    return evt.key === `Escape`;
  };

  const isKeyEnter = (evt) => {
    return evt.key === `Enter`;
  };

  const isMousedownLeft = (evt) => {
    return evt.which === 1;
  };

  const debounce = function (cb) {
    let lastTimeout = null;

    return function (...parameters) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb(...parameters);
      }, window.main.DEBOUNCE_TIMEOUT);
    };
  };

  window.util = {
    isKeyEscape: isKeyEscape,
    isKeyEnter: isKeyEnter,
    isMousedownLeft: isMousedownLeft,
    debounce: debounce
  };
})();
