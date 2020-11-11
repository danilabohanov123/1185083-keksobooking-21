"use strict";

(() => {
  const getPosition = (pin) => {
    const positionX = pin.offsetLeft + Math.floor(pin.offsetWidth / 2);
    const positionY = pin.offsetTop + Math.floor(pin.offsetHeight / 2);
    return positionX + `, ` + positionY;
  };

  const checkGuestsNumber = () => {
    if ((window.main.adFormRoomsNumber.options[0].selected && !window.main.adFormCapacity.options[2].selected) ||
      (window.main.adFormRoomsNumber.options[1].selected && !window.main.adFormCapacity.options[1].selected &&
      !window.main.adFormCapacity.options[2].selected) || (window.main.adFormRoomsNumber.options[2].selected &&
      window.main.adFormCapacity.options[3].selected) || (window.main.adFormRoomsNumber.options[3].selected &&
      !window.main.adFormCapacity.options[3].selected)) {
      window.main.adFormCapacity.setCustomValidity(`Неподходящее число гостей`);
      window.main.adFormCapacity.reportValidity();
      return;
    }
    window.main.adFormCapacity.setCustomValidity(``);
    window.main.adFormCapacity.reportValidity();
  };

  window.validation = {
    checkGuestsNumber: checkGuestsNumber
  };

  const checkTitle = () => {
    if (window.main.adFormTitle.validity.tooShort) {
      window.main.adFormTitle.setCustomValidity(`Слишком короткий заголовок`);
      window.main.adFormTitle.reportValidity();
      return;
    }
    if (window.main.adFormTitle.validity.tooLong) {
      window.main.adFormTitle.setCustomValidity(`Слишком длинный заголовок`);
      window.main.adFormTitle.reportValidity();
      return;
    }
    window.main.adFormTitle.setCustomValidity(``);
    window.main.adFormTitle.reportValidity();
  };

  window.validation.checkTitle = checkTitle;

  const checkPrice = () => {
    if (window.main.adFormType.value === `bungalow`) {
      window.main.adFormPrice.placeholder = 0;
    } else if (window.main.adFormType.value === `flat`) {
      window.main.adFormPrice.placeholder = 1000;
    } else if (window.main.adFormType.value === `house`) {
      window.main.adFormPrice.placeholder = 5000;
    } else {
      window.main.adFormPrice.placeholder = 10000;
    }
    if ((window.main.adFormType.value === `flat` && window.main.adFormPrice.value < 1000) ||
    (window.main.adFormType.value === `house` && window.main.adFormPrice.value < 5000) ||
    (window.main.adFormType.value === `palace` && window.main.adFormPrice.value < 10000)) {
      window.main.adFormPrice.setCustomValidity(`Слишком малая цена для данного типа жилья`);
    } else {
      window.main.adFormPrice.setCustomValidity(``);
    }
    window.main.adFormPrice.reportValidity();
  };

  window.validation.checkPrice = checkPrice;

  const syncTimein = () => {
    window.main.adFormTimein.value = window.main.adFormTimeout.value;
  };

  const syncTimeout = () => {
    window.main.adFormTimeout.value = window.main.adFormTimein.value;
  };

  window.validation.syncTimein = syncTimein;
  window.validation.syncTimeout = syncTimeout;

  const checkImageFile = (imageInput) => {
    const fileFormat = imageInput.value.split(`.`)[1];
    if (fileFormat !== `jpeg` && fileFormat !== `png`) {
      imageInput.setCustomValidity(`Неверный формат введённого изображения`);
    } else {
      imageInput.setCustomValidity(``);
    }
    imageInput.reportValidity();
  };

  window.validation.checkImageFile = checkImageFile;

  const checkFormAvatar = () => {
    window.validation.checkImageFile(window.main.adFormAvatar);
  };

  const checkFormImages = () => {
    window.validation.checkImageFile(window.main.adFormImages);
  };

  window.validation.checkFormAvatar = checkFormAvatar;
  window.validation.checkFormImages = checkFormImages;

  window.main.adFormAddress.value = getPosition(window.main.mapPinMain);

  window.main.adFormRoomsNumber.addEventListener(`input`, window.validation.checkGuestsNumber);
  window.main.adFormCapacity.addEventListener(`input`, window.validation.checkGuestsNumber);
  window.main.adFormTitle.addEventListener(`input`, window.validation.checkTitle);
  window.main.adFormType.addEventListener(`input`, window.validation.checkPrice);
  window.main.adFormPrice.addEventListener(`input`, window.validation.checkPrice);
  window.main.adFormTimein.addEventListener(`input`, window.validation.syncTimeout);
  window.main.adFormTimeout.addEventListener(`input`, window.validation.syncTimein);
  window.main.adFormAvatar.addEventListener(`input`, window.validation.checkFormAvatar);
  window.main.adFormImages.addEventListener(`input`, window.validation.checkFormImages);
})();
