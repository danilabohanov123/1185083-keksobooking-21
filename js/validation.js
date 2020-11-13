"use strict";

(() => {
  const getPosition = (pin) => {
    const positionX = pin.offsetLeft + Math.floor(pin.offsetWidth / 2);
    const positionY = pin.offsetTop + Math.floor(pin.offsetHeight / 2);
    return positionX + `, ` + positionY;
  };

  const onRoomsNumberInput = () => {
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

  const onTitleInput = () => {
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

  const onTypeInput = () => {
    if (window.main.adFormType.value === window.main.hotelTypes[3]) {
      window.main.adFormPrice.placeholder = window.main.minPrices[3];
    } else if (window.main.adFormType.value === window.main.hotelTypes[1]) {
      window.main.adFormPrice.placeholder = window.main.minPrices[1];
    } else if (window.main.adFormType.value === window.main.hotelTypes[2]) {
      window.main.adFormPrice.placeholder = window.main.minPrices[2];
    } else {
      window.main.adFormPrice.placeholder = window.main.minPrices[0];
    }
    if ((window.main.adFormType.value === window.main.hotelTypes[1] && window.main.adFormPrice.value < window.main.minPrices[1]) ||
    (window.main.adFormType.value === window.main.hotelTypes[2] && window.main.adFormPrice.value < window.main.minPrices[2]) ||
    (window.main.adFormType.value === window.main.hotelTypes[0] && window.main.adFormPrice.value < window.main.minPrices[0])) {
      window.main.adFormPrice.setCustomValidity(`Слишком малая цена для данного типа жилья`);
    } else {
      window.main.adFormPrice.setCustomValidity(``);
    }
    window.main.adFormPrice.reportValidity();
  };

  const onTimeoutInput = () => {
    window.main.adFormTimein.value = window.main.adFormTimeout.value;
  };

  const onTimeinInput = () => {
    window.main.adFormTimeout.value = window.main.adFormTimein.value;
  };

  const checkImageFile = (imageInput) => {
    const fileFormat = imageInput.value.split(`.`)[1];
    if (fileFormat !== `jpeg` && fileFormat !== `png`) {
      imageInput.setCustomValidity(`Неверный формат введённого изображения`);
    } else {
      imageInput.setCustomValidity(``);
    }
    imageInput.reportValidity();
  };

  const onAvatarInput = () => {
    window.validation.checkImageFile(window.main.adFormAvatar);
  };

  const onImagesInput = () => {
    window.validation.checkImageFile(window.main.adFormImages);
  };

  window.main.adFormAddress.value = getPosition(window.main.mapPinMain);

  window.validation = {
    onRoomsNumberInput: onRoomsNumberInput,
    onTitleInput: onTitleInput,
    onTypeInput: onTypeInput,
    onTimeoutInput: onTimeoutInput,
    onTimeinInput: onTimeinInput,
    checkImageFile: checkImageFile,
    onAvatarInput: onAvatarInput,
    onImagesInput: onImagesInput
  };

  window.main.adFormRoomsNumber.addEventListener(`input`, window.validation.onRoomsNumberInput);
  window.main.adFormCapacity.addEventListener(`input`, window.validation.onRoomsNumberInput);
  window.main.adFormTitle.addEventListener(`input`, window.validation.onTitleInput);
  window.main.adFormType.addEventListener(`input`, window.validation.onTypeInput);
  window.main.adFormPrice.addEventListener(`input`, window.validation.onTypeInput);
  window.main.adFormTimein.addEventListener(`input`, window.validation.onTimeinInput);
  window.main.adFormTimeout.addEventListener(`input`, window.validation.onTimeoutInput);
  window.main.adFormAvatar.addEventListener(`input`, window.validation.onAvatarInput);
  window.main.adFormImages.addEventListener(`input`, window.validation.onImagesInput);
})();
