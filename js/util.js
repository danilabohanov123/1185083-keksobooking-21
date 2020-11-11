"use strict";

(() => {
  const isKeyEscape = (evt) => {
    if (evt.key === `Escape`) {
      return true;
    }
    return false;
  };

  const isKeyEnter = (evt) => {
    if (evt.key === `Enter`) {
      return true;
    }
    return false;
  };

  const isMousedownLeft = (evt) => {
    if (evt.which === 1) {
      return true;
    }
    return false;
  };

  const generateRandomInteger = (minNumber, maxNumber) => {
    return minNumber + Math.round((Math.random() * (maxNumber - minNumber)));
  };

  window.util = {
    isKeyEscape: isKeyEscape,
    isKeyEnter: isKeyEnter,
    isMousedownLeft: isMousedownLeft,
    generateRandomInteger: generateRandomInteger
  };
})();
