"use strict";

(() => {
  const disableFormFieldsets = (formFieldsets) => {
    for (const formFieldset of formFieldsets) {
      formFieldset.disabled = true;
    }
  };

  const makeDisableStatus = () => {
    disableFormFieldsets(window.main.adFormFieldsets);
    disableFormFieldsets(window.main.mapFiltersFieldsets);
    disableFormFieldsets(window.main.mapFiltersSelects);
  };

  const enableFormFieldsets = (formFieldsets) => {
    for (const formFieldset of formFieldsets) {
      formFieldset.disabled = false;
    }
  };

  const makeEnableStatus = () => {
    window.main.map.classList.remove(`map--faded`);
    window.main.adForm.classList.remove(`ad-form--disabled`);
    window.mode.enableFormFieldsets(window.main.adFormFieldsets);
    window.mode.enableFormFieldsets(window.main.mapFiltersFieldsets);
    window.mode.enableFormFieldsets(window.main.mapFiltersSelects);
  };

  const onMainPinMousedownLeft = function () {
    if (!window.main.isEnableStatus) {
      window.mode.makeEnableStatus();
      window.mode.recalculateAdressValue();
      window.main.isEnableStatus = true;
      window.main.mapPinMain.removeEventListener(`mousedown`, window.mode.onMainPinMousedownLeft, false);
      window.main.mapPinMain.removeEventListener(`keydown`, window.mode.onMainPinKeydownEnter, false);
      window.main.mapPinMain.addEventListener(`mousedown`, (evt) => {
        evt.preventDefault();
        if (window.util.isMousedownLeft(evt)) {
          window.mode.onMainPinMousedown(evt);
        }
      });
    }
  };

  const onMainPinKeydownEnter = function () {
    if (!window.main.isEnableStatus) {
      window.mode.makeEnableStatus();
      window.mode.recalculateAdressValue();
      window.main.isEnableStatus = true;
      window.main.mapPinMain.removeEventListener(`mousedown`, window.mode.onMainPinMousedownLeft, false);
      window.main.mapPinMain.removeEventListener(`keydown`, window.mode.onMainPinKeydownEnter, false);
      window.main.mapPinMain.addEventListener(`mousedown`, (evt) => {
        evt.preventDefault();
        if (window.util.isMousedownLeft(evt)) {
          window.mode.onMainPinMousedown(evt);
        }
      });
    }
  };

  const recalculatePinPositionX = (lastPositionX, shiftX, pinWidth, mapWidth) => {
    return Math.round(Math.min(Math.max((lastPositionX - shiftX), -pinWidth / 2),
        mapWidth - pinWidth / 2)) + `px`;
  };

  const recalculatePinPositionY = (lastPositionY, shiftY, pinHeight) => {
    return Math.round(Math.min(Math.max((lastPositionY - shiftY), window.main.MAIN_PIN_MIN_Y -
    (pinHeight / 2 + window.main.MAIN_PIN_TRIANGLE_HEIGHT)),
    window.main.MAIN_PIN_MAX_Y - (pinHeight / 2 + window.main.MAIN_PIN_TRIANGLE_HEIGHT))) + `px`;
  };

  const recalculateAdressValue = () => {
    window.main.adFormAddress.value = Math.floor(window.main.mapPinMain.offsetLeft + window.main.mapPinMain.offsetWidth / 2) + `, ` +
      Math.floor(window.main.mapPinMain.offsetTop + window.main.mapPinMain.offsetHeight / 2 + window.main.MAIN_PIN_TRIANGLE_HEIGHT);
  };

  const onMainPinMousedown = (evt) => {
    const startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    let isDragged = false;

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      isDragged = true;

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords.x = moveEvt.clientX;
      startCoords.y = moveEvt.clientY;

      window.main.mapPinMain.style.top = window.mode.recalculatePinPositionY(window.main.mapPinMain.offsetTop, shift.y,
          window.main.mapPinMain.offsetHeight);
      window.main.mapPinMain.style.left = window.mode.recalculatePinPositionX(window.main.mapPinMain.offsetLeft, shift.x,
          window.main.mapPinMain.offsetWidth, window.main.map.offsetWidth);
      window.mode.recalculateAdressValue();
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (isDragged) {
        const onClickPreventDefault = (clickEvt) => {
          clickEvt.preventDefault();
          window.main.mapPinMain.removeEventListener(`click`, onClickPreventDefault);
        };
        window.main.mapPinMain.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  makeDisableStatus();

  window.mode = {
    enableFormFieldsets: enableFormFieldsets,
    makeEnableStatus: makeEnableStatus,
    onMainPinMousedownLeft: onMainPinMousedownLeft,
    onMainPinKeydownEnter: onMainPinKeydownEnter,
    onMainPinMousedown: onMainPinMousedown,
    recalculatePinPositionX: recalculatePinPositionX,
    recalculatePinPositionY: recalculatePinPositionY,
    recalculateAdressValue: recalculateAdressValue
  };

  window.main.mapPinMain.addEventListener(`mousedown`, (evt) => {
    if (window.util.isMousedownLeft(evt)) {
      window.mode.onMainPinMousedownLeft();
    }
  });

  window.main.mapPinMain.addEventListener(`keydown`, (evt) => {
    if (window.util.isKeyEnter(evt)) {
      window.mode.onMainPinKeydownEnter();
    }
  });

})();
