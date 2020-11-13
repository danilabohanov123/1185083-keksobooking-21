"use strict";

(() => {
  const ADS_COUNT = 10;
  const MAIN_PIN_TRIANGLE_HEIGHT = 22;
  const MAIN_PIN_MIN_Y = 130;
  const MAIN_PIN_MAX_Y = 600;
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const hotelTypes = [`palace`, `flat`, `house`, `bungalow`];
  const minPrices = [10000, 1000, 5000, 0];
  const hotelFeatures = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const hotelPhotos = [1, 2, 3];
  const hotelTimes = [`12:00`, `13:00`, `14:00`];

  const EnglisHousingToRussian = {
    flat: `Квартира`,
    bungalow: `Бунгало`,
    house: `Дом`,
    palace: `Дворец`
  };

  const EnglisfeatureToRussian = {
    wifi: `вай-фай`,
    dishwasher: `посудомойка`,
    parking: `парковка`,
    washer: `стиральная машина`,
    elevator: `лифт`,
    conditioner: `кондиционер`
  };

  let isEnableStatus = false;
  const body = document.querySelector(`body`);
  const adForm = body.querySelector(`.ad-form`);
  const adFormFieldsets = adForm.querySelectorAll(`fieldset`);
  const map = body.querySelector(`.map`);
  const mapFilters = map.querySelector(`.map__filters`);
  const mapFiltersFieldsets = mapFilters.querySelectorAll(`fieldset`);
  const mapFiltersSelects = mapFilters.querySelectorAll(`select`);
  const pinTemplate = body.querySelector(`#pin`).content.querySelector(`button`);
  const fragmentPins = document.createDocumentFragment();
  const cardTemplate = body.querySelector(`#card`).content.querySelector(`article`);
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

  window.main = {
    body: body,
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
    adFormImages: adFormImages,
    ADS_COUNT: ADS_COUNT,
    hotelTypes: hotelTypes,
    hotelFeatures: hotelFeatures,
    hotelPhotos: hotelPhotos,
    hotelTimes: hotelTimes,
    EnglisHousingToRussian: EnglisHousingToRussian,
    EnglisfeatureToRussian: EnglisfeatureToRussian,
    minPrices: minPrices,
    MAIN_PIN_TRIANGLE_HEIGHT: MAIN_PIN_TRIANGLE_HEIGHT,
    MAIN_PIN_MIN_Y: MAIN_PIN_MIN_Y,
    MAIN_PIN_MAX_Y: MAIN_PIN_MAX_Y,
    URL: URL
  };
})();
