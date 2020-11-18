"use strict";

(() => {
  const MAIN_PIN_TRIANGLE_HEIGHT = 22;
  const MAX_HOUSING_PRICE = 1000000;
  const REQUEST_TIMEOUT = 10000;
  const DEBOUNCE_TIMEOUT = 500;
  const PINS_LIMIT = 5;
  const DEFAULT_INPUT_VALUE = `any`;
  const INFINITY = 2000000000;
  const DEFUALT_PLACEHOLDER_VALUE = 1000;
  const BASE = 10;
  const MAIN_PIN_DIAMETER = 62;


  const MainPinY = {
    MIN: 130,
    MAX: 630
  };

  const FileFormat = {
    JPG: `jpg`,
    PNG: `png`
  };

  const StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404
  };

  const Urls = {
    DOWNLOAD: `https://21.javascript.pages.academy/keksobooking/data`,
    UPLOAD: `https://21.javascript.pages.academy/keksobooking`
  };

  const IsCorrectInput = {
    title: false,
    capacity: true,
    price: false,
    avatar: true,
    images: true
  };

  const SortingParameters = {
    type: DEFAULT_INPUT_VALUE,
    minPrice: 0,
    maxPrice: 0,
    roomsNumber: DEFAULT_INPUT_VALUE,
    guestsNumber: DEFAULT_INPUT_VALUE,
    features: []
  };

  const hotelTypes = [`palace`, `flat`, `house`, `bungalow`];
  const minPrices = [10000, 1000, 5000, 0];
  const pricePoints = [0, 10000, 50000];
  const priceLevels = [`low`, `middle`];

  const EnglishHousingToRussian = {
    flat: `Квартира`,
    bungalow: `Бунгало`,
    house: `Дом`,
    palace: `Дворец`
  };

  const TitleLength = {
    MIN: 30,
    MAX: 100
  };

  const body = document.querySelector(`body`);
  const main = body.querySelector(`main`);
  const adForm = main.querySelector(`.ad-form`);
  const adFormFieldsets = adForm.querySelectorAll(`fieldset`);
  const map = main.querySelector(`.map`);
  const mapFilters = map.querySelector(`.map__filters`);
  const mapFiltersFieldsets = mapFilters.querySelectorAll(`fieldset`);
  const mapFiltersSelects = mapFilters.querySelectorAll(`select`);
  const mapFiltersType = mapFilters.querySelector(`#housing-type`);
  const mapFiltersPrice = mapFilters.querySelector(`#housing-price`);
  const mapFiltersRooms = mapFilters.querySelector(`#housing-rooms`);
  const mapFiltersGuests = mapFilters.querySelector(`#housing-guests`);
  const mapFiltersFeatures = mapFilters.querySelectorAll(`.map__checkbox`);
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
  const adFromSubmit = adForm.querySelector(`.ad-form__submit`);
  const adFormDescription = adForm.querySelector(`#description`);
  const adFormFeatures = adForm.querySelectorAll(`.feature__checkbox`);
  const adFormReset = adForm.querySelector(`.ad-form__reset`);
  const adFormPhoto = adForm.querySelector(`.ad-form__photo`);
  const avatarPreview = adForm.querySelector(`.ad-form-header__preview`).querySelector(`img`);
  const housingPhoto = avatarPreview.cloneNode(true);
  const successMessageTemplate = body.querySelector(`#success`).content.querySelector(`div`);
  const errorMessageTemplate = body.querySelector(`#error`).content.querySelector(`div`);

  window.main = {
    body: body,
    main: main,
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
    isEnableStatus: false,
    adFormTitle: adFormTitle,
    adFormRoomsNumber: adFormRoomsNumber,
    adFormCapacity: adFormCapacity,
    adFormType: adFormType,
    adFormPrice: adFormPrice,
    adFormTimein: adFormTimein,
    adFormTimeout: adFormTimeout,
    adFormAvatar: adFormAvatar,
    adFormImages: adFormImages,
    adFormDescription: adFormDescription,
    hotelTypes: hotelTypes,
    EnglishHousingToRussian: EnglishHousingToRussian,
    minPrices: minPrices,
    MAIN_PIN_TRIANGLE_HEIGHT: MAIN_PIN_TRIANGLE_HEIGHT,
    MainPinY: MainPinY,
    MAX_HOUSING_PRICE: MAX_HOUSING_PRICE,
    Urls: Urls,
    card: undefined,
    adFromSubmit: adFromSubmit,
    IsCorrectInput: IsCorrectInput,
    adFormFeatures: adFormFeatures,
    adFormReset: adFormReset,
    successMessageTemplate: successMessageTemplate,
    errorMessageTemplate: errorMessageTemplate,
    mapFiltersType: mapFiltersType,
    mapFiltersPrice: mapFiltersPrice,
    mapFiltersRooms: mapFiltersRooms,
    mapFiltersGuests: mapFiltersGuests,
    mapFiltersFeatures: mapFiltersFeatures,
    isDataDownload: false,
    isPhotoInsert: false,
    SortingParameters: SortingParameters,
    similarAnnouncements: undefined,
    StatusCode: StatusCode,
    REQUEST_TIMEOUT: REQUEST_TIMEOUT,
    DEBOUNCE_TIMEOUT: DEBOUNCE_TIMEOUT,
    DEFAULT_INPUT_VALUE: DEFAULT_INPUT_VALUE,
    DEFUALT_PLACEHOLDER_VALUE: DEFUALT_PLACEHOLDER_VALUE,
    MAIN_PIN_DIAMETER: MAIN_PIN_DIAMETER,
    PINS_LIMIT: PINS_LIMIT,
    INFINITY: INFINITY,
    BASE: BASE,
    pricePoints: pricePoints,
    priceLevels: priceLevels,
    TitleLength: TitleLength,
    FileFormat: FileFormat,
    KEKS_IMAGE_PATH: `img/muffin-grey.svg`,
    avatarPreview: avatarPreview,
    adFormPhoto: adFormPhoto,
    housingPhoto: housingPhoto
  };
})();
