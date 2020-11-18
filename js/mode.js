"use strict";

(() => {
  const disableFormFieldsets = (formFieldsets) => {
    for (const formFieldset of formFieldsets) {
      formFieldset.disabled = true;
    }
  };

  const resetCheckboxes = (checkboxes) => {
    for (const checkboxe of checkboxes) {
      checkboxe.checked = false;
    }
  };

  const resetInputs = () => {
    if (window.main.isPhotoInsert) {
      window.housingPhoto.remove();
      window.main.isPhotoInsert = false;
    }
    window.main.avatarPreview.src = window.main.KEKS_IMAGE_PATH;
    window.main.IsCorrectInput.title = false;
    window.main.IsCorrectInput.capacity = true;
    window.main.IsCorrectInput.price = false;
    window.main.IsCorrectInput.avatar = true;
    window.main.IsCorrectInput.images = true;
    window.main.adFormTitle.value = ``;
    window.main.adFormType.value = window.main.hotelTypes[1];
    window.main.adFormPrice.value = ``;
    window.main.adFormPrice.placeholder = window.main.DEFUALT_PLACEHOLDER_VALUE;
    window.main.adFormRoomsNumber.value = 1;
    window.main.adFormCapacity.value = 1;
    window.main.adFormDescription.value = ``;
    window.main.adFormAvatar.value = ``;
    window.main.adFormImages.value = ``;
    window.main.adFormTimein.value = `12:00`;
    window.main.adFormTimeout.value = window.main.adFormTimein.value;
    window.mode.resetCheckboxes(window.main.adFormFeatures);
    window.main.mapFiltersType.value = window.main.DEFAULT_INPUT_VALUE;
    window.main.mapFiltersPrice.value = window.main.DEFAULT_INPUT_VALUE;
    window.main.mapFiltersRooms.value = window.main.DEFAULT_INPUT_VALUE;
    window.main.mapFiltersGuests.value = window.main.DEFAULT_INPUT_VALUE;
    window.mode.resetCheckboxes(window.main.mapFiltersFeatures);
  };

  const resetSortingParameters = () => {
    window.main.SortingParameters.type = window.main.DEFAULT_INPUT_VALUE;
    window.main.SortingParameters.minPrice = 0;
    window.main.SortingParameters.maxPrice = window.main.INFINITY;
    window.main.SortingParameters.roomsNumber = window.main.DEFAULT_INPUT_VALUE;
    window.main.SortingParameters.guestsNumber = window.main.DEFAULT_INPUT_VALUE;
    window.main.SortingParameters.features = [];
  };

  const resetPinPosition = () => {
    window.main.mapPinMain.style.left = Math.round((window.main.map.offsetWidth - window.main.MAIN_PIN_DIAMETER) / 2) + `px`;
    window.main.mapPinMain.style.top = Math.round((window.main.map.offsetHeight - window.main.MAIN_PIN_DIAMETER) / 2) + `px`;
    window.main.adFormAddress.value = Math.round(window.main.map.offsetWidth / 2) + `, ` + Math.round(window.main.map.offsetHeight / 2);
  };

  const makeDisableStatus = () => {
    window.main.isEnableStatus = false;
    window.main.map.classList.add(`map--faded`);
    window.main.adForm.classList.add(`ad-form--disabled`);
    window.mode.disableFormFieldsets(window.main.adFormFieldsets);
    window.mode.disableFormFieldsets(window.main.mapFiltersFieldsets);
    window.mode.disableFormFieldsets(window.main.mapFiltersSelects);
    window.mode.resetInputs();
    window.mode.resetSortingParameters();
    window.main.mapPinMain.addEventListener(`keydown`, window.mode.onMainPinKeydownEnter);
    if (window.mode.isPinsdDrawn) {
      window.map.deletePins();
    }
    if (window.main.card) {
      document.removeEventListener(`keydown`, window.map.onAdCardEscape);
      window.map.closeAdCard();
    }
    window.mode.resetPinPosition();
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
    if (window.main.isDataDownload) {
      window.mode.enableFormFieldsets(window.main.mapFiltersFieldsets);
      window.mode.enableFormFieldsets(window.main.mapFiltersSelects);
      window.filter.rerenderPins();
    }
  };

  const recalculatePinPositionX = (lastPositionX, shiftX, mapWidth) => {
    return Math.round(Math.min(Math.max((lastPositionX - shiftX), -window.main.MAIN_PIN_DIAMETER / 2),
        mapWidth - window.main.MAIN_PIN_DIAMETER / 2)) + `px`;
  };

  const recalculatePinPositionY = (lastPositionY, shiftY) => {
    return Math.round(Math.min(Math.max((lastPositionY - shiftY), window.main.MainPinY.MIN -
    (window.main.MAIN_PIN_DIAMETER / 2 + window.main.MAIN_PIN_TRIANGLE_HEIGHT)),
    window.main.MainPinY.MAX - (window.main.MAIN_PIN_DIAMETER / 2 + window.main.MAIN_PIN_TRIANGLE_HEIGHT))) + `px`;
  };

  const recalculateAdressValue = () => {
    window.main.adFormAddress.value = Math.round(window.main.mapPinMain.offsetLeft + window.main.MAIN_PIN_DIAMETER / 2) + `, ` +
      Math.round(window.main.mapPinMain.offsetTop + window.main.MAIN_PIN_DIAMETER / 2 + window.main.MAIN_PIN_TRIANGLE_HEIGHT);
  };

  const onMainPinMousedown = (evt) => {
    if (window.util.isMousedownLeft(evt)) {
      if (!window.main.isEnableStatus) {
        window.mode.makeEnableStatus();
        window.mode.recalculateAdressValue();
        window.main.isEnableStatus = true;
        window.main.mapPinMain.removeEventListener(`keydown`, window.mode.onMainPinKeydownEnter, false);
      }
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

        window.main.mapPinMain.style.top = window.mode.recalculatePinPositionY(window.main.mapPinMain.offsetTop, shift.y);
        window.main.mapPinMain.style.left = window.mode.recalculatePinPositionX(window.main.mapPinMain.offsetLeft, shift.x, window.main.map.offsetWidth);
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
    }
  };

  const onMainPinKeydownEnter = function (evt) {
    if (window.util.isKeyEnter(evt) && !window.main.isEnableStatus) {
      window.mode.makeEnableStatus();
      window.mode.recalculateAdressValue();
      window.main.isEnableStatus = true;
      window.main.mapPinMain.removeEventListener(`keydown`, window.mode.onMainPinKeydownEnter, false);
    }
  };

  window.mode = {
    disableFormFieldsets: disableFormFieldsets,
    makeDisableStatus: makeDisableStatus,
    enableFormFieldsets: enableFormFieldsets,
    makeEnableStatus: makeEnableStatus,
    onMainPinKeydownEnter: onMainPinKeydownEnter,
    onMainPinMousedown: onMainPinMousedown,
    recalculatePinPositionX: recalculatePinPositionX,
    recalculatePinPositionY: recalculatePinPositionY,
    recalculateAdressValue: recalculateAdressValue,
    resetInputs: resetInputs,
    resetSortingParameters: resetSortingParameters,
    resetPinPosition: resetPinPosition,
    resetCheckboxes: resetCheckboxes,
    isPinsdDrawn: false
  };

  window.mode.makeDisableStatus();
  window.main.mapPinMain.addEventListener(`mousedown`, window.mode.onMainPinMousedown);

  window.main.adFormReset.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    window.mode.makeDisableStatus();
  });
})();
