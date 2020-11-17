"use strict";

(() => {
  const onRoomsNumberInput = () => {
    if ((window.main.adFormRoomsNumber.options[0].selected && !window.main.adFormCapacity.options[2].selected) ||
      (window.main.adFormRoomsNumber.options[1].selected && !window.main.adFormCapacity.options[1].selected &&
      !window.main.adFormCapacity.options[2].selected) || (window.main.adFormRoomsNumber.options[2].selected &&
      window.main.adFormCapacity.options[3].selected) || (window.main.adFormRoomsNumber.options[3].selected &&
      !window.main.adFormCapacity.options[3].selected)) {
      window.main.IsCorrectInput.capacity = false;
      window.main.adFormCapacity.setCustomValidity(`Неподходящее число гостей`);
      window.main.adFormCapacity.reportValidity();
      return;
    }
    window.main.IsCorrectInput.capacity = true;
    window.main.adFormCapacity.setCustomValidity(``);
    window.main.adFormCapacity.reportValidity();
  };

  const onTitleInput = () => {
    if (window.main.adFormTitle.value.length < 30) {
      window.main.IsCorrectInput.title = false;
      window.main.adFormTitle.setCustomValidity(`Слишком короткий заголовок`);
      window.main.adFormTitle.reportValidity();
      return;
    }
    if (window.main.adFormTitle.value.length > 100) {
      window.main.IsCorrectInput.title = false;
      window.main.adFormTitle.setCustomValidity(`Слишком длинный заголовок`);
      window.main.adFormTitle.reportValidity();
      return;
    }
    window.main.IsCorrectInput.title = true;
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
    if (window.main.adFormPrice.value > window.main.MAX_HOUSING_PRICE) {
      window.main.IsCorrectInput.price = false;
      window.main.adFormPrice.setCustomValidity(`Слишком большая цена для данного типа жилья`);
      window.main.adFormPrice.reportValidity();
      return;
    }
    if (!window.main.adFormPrice.value) {
      window.main.IsCorrectInput.price = false;
      window.main.adFormPrice.setCustomValidity(`Введите цену жилья`);
      window.main.adFormPrice.reportValidity();
      return;
    }
    if ((window.main.adFormType.value === window.main.hotelTypes[1] && window.main.adFormPrice.value < window.main.minPrices[1]) ||
    (window.main.adFormType.value === window.main.hotelTypes[2] && window.main.adFormPrice.value < window.main.minPrices[2]) ||
    (window.main.adFormType.value === window.main.hotelTypes[0] && window.main.adFormPrice.value < window.main.minPrices[0])) {
      window.main.IsCorrectInput.price = false;
      window.main.adFormPrice.setCustomValidity(`Слишком малая цена для данного типа жилья`);
      window.main.adFormPrice.reportValidity();
      return;
    }
    window.main.IsCorrectInput.price = true;
    window.main.adFormPrice.setCustomValidity(``);
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
    let isValid;
    if (imageInput.value && fileFormat !== `jpeg` && fileFormat !== `png`) {
      isValid = false;
      imageInput.setCustomValidity(`Неверный формат введённого изображения`);
    } else {
      isValid = true;
      imageInput.setCustomValidity(``);
    }
    if (imageInput.name === window.main.adFormAvatar.name) {
      window.main.IsCorrectInput.avatar = isValid;
    } else {
      window.main.IsCorrectInput.images = isValid;
    }
    imageInput.reportValidity();
  };

  const onAvatarInput = () => {
    window.validation.checkImageFile(window.main.adFormAvatar);
  };

  const onImagesInput = () => {
    window.validation.checkImageFile(window.main.adFormImages);
  };

  const checkAdFormInput = () => {
    for (const isCorrect of Object.values(window.main.IsCorrectInput)) {
      if (!isCorrect) {
        return false;
      }
    }
    return true;
  };

  window.validation = {
    onRoomsNumberInput: onRoomsNumberInput,
    onTitleInput: onTitleInput,
    onTypeInput: onTypeInput,
    onTimeoutInput: onTimeoutInput,
    onTimeinInput: onTimeinInput,
    checkImageFile: checkImageFile,
    onAvatarInput: onAvatarInput,
    onImagesInput: onImagesInput,
    checkAdFormInput: checkAdFormInput
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
