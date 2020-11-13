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
