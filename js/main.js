"use strict";

(() => {
  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldsets = adForm.querySelectorAll(`fieldset`);
  const map = document.querySelector(`.map`);
  const mapFilters = map.querySelector(`.map__filters`);
  const mapFiltersFieldsets = mapFilters.querySelectorAll(`fieldset`);
  const mapFiltersSelects = mapFilters.querySelectorAll(`select`);
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`button`);
  const fragmentPins = document.createDocumentFragment();
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`article`);
  const mapFiltersContainer = map.querySelector(`.map__filters-container`);
  const mapPins = map.querySelector(`.map__pins`);
  const mapPinMain = mapPins.querySelector(`.map__pin--main`);
  const adFormAddress = adForm.querySelector(`#address`);
  const adFormTitle = adForm.querySelector(`#title`);
  const adFormRoomsNumber = adForm.querySelector(`#room_number`);
  const adFormCapacity = adForm.querySelector(`#capacity`);
  const adFormType = adForm.querySelector(`#type`);
  const adFormPrice = adForm.querySelector(`#price`);
  const adFormTimein = adForm.querySelector(`#timein`);
  const adFormTimeout = adForm.querySelector(`#timeout`);
  const adFormAvatar = adForm.querySelector(`#avatar`);
  const adFormImages = adForm.querySelector(`#images`);

  let isEnableStatus = false;

  window.main = {
    adForm: adForm,
    adFormFieldsets: adFormFieldsets,
    map: map,
    mapFilters: mapFilters,
    mapFiltersFieldsets: mapFiltersFieldsets,
    mapFiltersSelects: mapFiltersSelects,
    pinTemplate: pinTemplate,
    fragmentPins: fragmentPins,
    cardTemplate: cardTemplate,
    mapFiltersContainer: mapFiltersContainer,
    mapPins: mapPins,
    mapPinMain: mapPinMain,
    adFormAddress: adFormAddress,
    isEnableStatus: isEnableStatus,
    adFormTitle: adFormTitle,
    adFormRoomsNumber: adFormRoomsNumber,
    adFormCapacity: adFormCapacity,
    adFormType: adFormType,
    adFormPrice: adFormPrice,
    adFormTimein: adFormTimein,
    adFormTimeout: adFormTimeout,
    adFormAvatar: adFormAvatar,
    adFormImages: adFormImages
  };
})();
