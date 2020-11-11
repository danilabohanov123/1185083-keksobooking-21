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

  makeDisableStatus();

  const enableFormFieldsets = (formFieldsets) => {
    for (const formFieldset of formFieldsets) {
      formFieldset.disabled = false;
    }
  };

  window.mode = {
    enableFormFieldsets: enableFormFieldsets
  };

  const makeEnableStatus = () => {
    window.main.map.classList.remove(`map--faded`);
    window.main.adForm.classList.remove(`ad-form--disabled`);
    window.mode.enableFormFieldsets(window.main.adFormFieldsets);
    window.mode.enableFormFieldsets(window.main.mapFiltersFieldsets);
    window.mode.enableFormFieldsets(window.main.mapFiltersSelects);
  };

  window.mode.makeEnableStatus = makeEnableStatus;

  const onMainPinMousedownLeft = function () {
    if (!window.main.isEnableStatus) {
      window.mode.makeEnableStatus();
      window.main.isEnableStatus = true;
    }
  };

  window.mode.onMainPinMousedownLeft = onMainPinMousedownLeft;

  window.main.mapPinMain.addEventListener(`mousedown`, (evt) => {
    if (window.util.isMousedownLeft(evt)) {
      window.mode.onMainPinMousedownLeft();
    }
  });

  const onMainPinKeydownEnter = function () {
    if (!window.main.isEnableStatus) {
      window.mode.makeEnableStatus();
      window.main.isEnableStatus = true;
    }
  };

  window.mode.onMainPinKeydownEnter = onMainPinKeydownEnter;

  window.main.mapPinMain.addEventListener(`keydown`, (evt) => {
    if (window.util.isKeyEnter(evt)) {
      window.mode.onMainPinKeydownEnter();
    }
  });

})();
