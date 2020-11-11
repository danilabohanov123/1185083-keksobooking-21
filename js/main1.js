"use strict";

const AD_NUMBER = 8;
/* const PIN_TRIANGLE_WIDTH = 10;
const PIN_TRIANGLE_HEIGHT = 22;*/

const hotelTypes = [`palace`, `flat`, `house`, `bungalow`];
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

const isKeyEscape = (evt) => {
  if (evt.key === `Escape`) {
    return true;
  }
  return false;
};

const isKeyEnter = (evt) => {
  if (evt.key === `Enter`) {
    return true;
  }
  return false;
};

const isMousedownLeft = (evt) => {
  if (evt.which === 1) {
    return true;
  }
  return false;
};

const generateRandomInteger = (minNumber, maxNumber) => {
  return minNumber + Math.round((Math.random() * (maxNumber - minNumber)));
};

const shuffleList = (itemsList) => {
  const usedIndexes = [];
  for (let i = 0; i < itemsList.length; i++) {
    usedIndexes.push(false);
  }
  const shuffledItemsList = [];
  for (let i = 0; i < itemsList.length; i++) {
    const nextIndex = generateRandomInteger(1, itemsList.length - i);
    let falseCounter = 0;
    for (let j = 0; j < usedIndexes.length; j++) {
      if (!usedIndexes[j]) {
        falseCounter++;
        if (falseCounter === nextIndex) {
          usedIndexes[j] = true;
          shuffledItemsList.push(itemsList[j]);
        }
      }
    }
  }
  return shuffledItemsList;
};

const listIndexes = [];
for (let i = 1; i <= AD_NUMBER; i++) {
  listIndexes.push(i);
}

const listAvatarIndexes = shuffleList(listIndexes);

const generateOffer = (title, address, price, type, rooms, guests, checkin, checkout, features,
    description, photos) => {
  return {title: title, address: address, price: price, type: type, rooms: rooms, guests: guests,
    checkin: checkin, checkout: checkout, features: features, description: description, photos: photos};
};

const generateTypes = () => {
  const typeInd = generateRandomInteger(0, hotelTypes.length - 1);
  return hotelTypes[typeInd];
};

const generateAccommodationOfGuests = () => {
  let roomsNumber = generateRandomInteger(1, 4);
  let guestsNumber = generateRandomInteger(roomsNumber, 3);
  if (roomsNumber === 4) {
    roomsNumber = 100;
    guestsNumber = 0;
  }
  return {rooms: roomsNumber, guests: guestsNumber};
};

const generateCheckin = () => {
  return hotelTimes[generateRandomInteger(0, hotelTypes.length - 1)];
};

const generateCheckout = () => {
  return hotelTimes[generateRandomInteger(0, hotelTypes.length - 1)];
};

const generateRandomSubarray = (arrayItems) => {
  const randomSubarraySize = generateRandomInteger(1, arrayItems.length);
  const randomSubarray = shuffleList(arrayItems).slice(0, randomSubarraySize);
  return randomSubarray;
};

const generateFeatures = () => {
  return generateRandomSubarray(hotelFeatures);
};

const generatePhotos = () => {
  const RandomSubarrayPhotos = generateRandomSubarray(hotelPhotos);
  for (let i = 0; i < RandomSubarrayPhotos.length; i++) {
    RandomSubarrayPhotos[i] = `http://o0.github.io/assets/images/tokyo/hotel` + RandomSubarrayPhotos[i] + `.jpg`;
  }
  return RandomSubarrayPhotos;
};

const generateLocation = () => {
  return {x: generateRandomInteger(0, 100), y: generateRandomInteger(130, 630)};
};

const generateAnnouncement = (ind) => {
  const author = {avatar: `img/avatars/user0` + listAvatarIndexes[ind] + `.png`};
  const location = generateLocation();
  const livingSetup = generateAccommodationOfGuests();
  const offer = generateOffer(`Title`, location.x + `, ` + location.y,
      generateRandomInteger(100, 10000), generateTypes(), livingSetup.rooms,
      livingSetup.guests, generateCheckin(), generateCheckout(),
      generateFeatures(), `Some words about hotel.`, generatePhotos());
  return {author: author, offer: offer, location: location};
};

const announcementsList = [];

for (let i = 0; i < AD_NUMBER; i++) {
  announcementsList.push(generateAnnouncement(i));
}

const adForm = document.querySelector(`.ad-form`);
const adFormFieldsets = adForm.querySelectorAll(`fieldset`);
const map = document.querySelector(`.map`);
const mapFilters = map.querySelector(`.map__filters`);
const mapFiltersFieldsets = mapFilters.querySelectorAll(`fieldset`);
const mapFiltersSelects = mapFilters.querySelectorAll(`select`);

const disableFormFieldsets = (formFieldsets) => {
  for (const formFieldset of formFieldsets) {
    formFieldset.disabled = true;
  }
};

const enableFormFieldsets = (formFieldsets) => {
  for (const formFieldset of formFieldsets) {
    formFieldset.disabled = false;
  }
};

let isEnableStatus = false;

const makeDisableStatus = () => {
  disableFormFieldsets(adFormFieldsets);
  disableFormFieldsets(mapFiltersFieldsets);
  disableFormFieldsets(mapFiltersSelects);
};

const makeEnableStatus = () => {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  enableFormFieldsets(adFormFieldsets);
  enableFormFieldsets(mapFiltersFieldsets);
  enableFormFieldsets(mapFiltersSelects);
};

const onMainPinMousedownLeft = function () {
  if (!isEnableStatus) {
    makeEnableStatus();
    isEnableStatus = true;
  }
};

const onMainPinKeydownEnter = function () {
  if (!isEnableStatus) {
    makeEnableStatus();
    isEnableStatus = true;
  }
};

const getPosition = (pin) => {
  const positionX = pin.offsetLeft + Math.floor(pin.offsetWidth / 2);
  const positionY = pin.offsetTop + Math.floor(pin.offsetHeight / 2);
  return positionX + `, ` + positionY;
};

const adFormTitle = adForm.querySelector(`#title`);
const adFormRoomsNumber = adForm.querySelector(`#room_number`);
const adFormCapacity = adForm.querySelector(`#capacity`);
const adFormType = adForm.querySelector(`#type`);
const adFormPrice = adForm.querySelector(`#price`);
const adFormTimein = adForm.querySelector(`#timein`);
const adFormTimeout = adForm.querySelector(`#timeout`);
const adFormAvatar = adForm.querySelector(`#avatar`);
const adFormImages = adForm.querySelector(`#images`);

const checkGuestsNumber = () => {
  if ((adFormRoomsNumber.options[0].selected && !adFormCapacity.options[2].selected) ||
    (adFormRoomsNumber.options[1].selected && !adFormCapacity.options[1].selected && !adFormCapacity.options[2].selected) ||
    adFormRoomsNumber.options[2].selected && adFormCapacity.options[3].selected ||
    adFormRoomsNumber.options[3].selected && !adFormCapacity.options[3].selected) {
    adFormCapacity.setCustomValidity(`Неподходящее число гостей`);
  } else {
    adFormCapacity.setCustomValidity(``);
  }
  adFormCapacity.reportValidity();
};

const checkTitle = () => {
  if (adFormTitle.validity.tooShort) {
    adFormTitle.setCustomValidity(`Слишком короткий заголовок`);
  } else if (adFormTitle.validity.tooLong) {
    adFormTitle.setCustomValidity(`Слишком длинный заголовок`);
  } else {
    adFormTitle.setCustomValidity(``);
  }
  adFormTitle.reportValidity();
};

const checkPrice = () => {
  if (adFormType.value === `bungalow`) {
    adFormPrice.placeholder = 0;
  } else if (adFormType.value === `flat`) {
    adFormPrice.placeholder = 1000;
  } else if (adFormType.value === `house`) {
    adFormPrice.placeholder = 5000;
  } else {
    adFormPrice.placeholder = 10000;
  }
  if ((adFormType.value === `flat` && adFormPrice.value < 1000) ||
  (adFormType.value === `house` && adFormPrice.value < 5000) ||
  (adFormType.value === `palace` && adFormPrice.value < 10000)) {
    adFormPrice.setCustomValidity(`Слишком малая цена для данного типа жилья`);
  } else {
    adFormPrice.setCustomValidity(``);
  }
  adFormPrice.reportValidity();
};

const syncTimein = () => {
  for (let i = 0; i < 3; i++) {
    if (adFormTimeout.options[i].selected) {
      adFormTimein.options[i].selected = true;
    }
  }
};

const syncTimeout = () => {
  for (let i = 0; i < 3; i++) {
    if (adFormTimein.options[i].selected) {
      adFormTimeout.options[i].selected = true;
    }
  }
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

const checkFormAvatar = () => {
  checkImageFile(adFormAvatar);
};

const checkFormImages = () => {
  checkImageFile(adFormImages);
};

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`button`);
const fragmentPins = document.createDocumentFragment();
const cardTemplate = document.querySelector(`#card`).content.querySelector(`article`);
const mapFiltersContainer = map.querySelector(`.map__filters-container`);
let isAdCardOpen = false;

let card;

const closeAdCard = function () {
  map.removeChild(card);
  isAdCardOpen = false;
};

const onEscapeCloseAdCard = function (evt) {
  if (isKeyEscape(evt)) {
    closeAdCard(card);
  }
  document.removeEventListener(`keydown`, onEscapeCloseAdCard);
};

const renderAdCard = (ind) => {
  const announcement = announcementsList[ind];
  card = cardTemplate.cloneNode(true);
  const popupTitle = card.querySelector(`.popup__title`);
  popupTitle.textContent = announcement.offer.title;
  const popupTextAddress = card.querySelector(`.popup__text--address`);
  popupTextAddress.textContent = announcement.offer.address;
  const popupTextPrice = card.querySelector(`.popup__text--price`);
  popupTextPrice.textContent = announcement.offer.price + `₽/ночь`;
  const popupType = card.querySelector(`.popup__type`);
  popupType.textContent = EnglisHousingToRussian[announcement.offer.type];
  const popupTextCapacity = card.querySelector(`.popup__text--capacity`);
  popupTextCapacity.textContent = announcement.offer.rooms + ` комнаты для ` +
    announcement.offer.guests + ` гостей`;
  const popupTextTime = card.querySelector(`.popup__text--time`);
  popupTextTime.textContent = `Заезд после ` + announcement.offer.checkin +
    `, выезд до ` + announcement.offer.checkout;
  const popupFeatures = card.querySelector(`.popup__features`);
  popupFeatures.textContent = `Удобства: ` + EnglisfeatureToRussian[announcement.offer.features[0]];
  for (let i = 1; i < announcement.offer.features.length; i++) {
    popupFeatures.textContent += `, ` + EnglisfeatureToRussian[announcement.offer.features[i]];
  }
  const popupDescription = card.querySelector(`.popup__description`);
  popupDescription.textContent = announcement.offer.description;
  const popupPhotos = card.querySelector(`.popup__photos`);
  const popupPhoto = popupPhotos.querySelector(`.popup__photo`);
  popupPhoto.src = announcement.offer.photos[0];
  for (let i = 1; i < announcement.offer.photos.length; i++) {
    const newPopupPhoto = popupPhoto.cloneNode(true);
    newPopupPhoto.src = announcement.offer.photos[i];
    popupPhotos.appendChild(newPopupPhoto);
  }
  const popupAvatar = card.querySelector(`.popup__avatar`);
  popupAvatar.src = announcement.author.avatar;
  const popupClose = card.querySelector(`.popup__close`);
  popupClose.addEventListener(`click`, () => {
    closeAdCard(card);
  });
  document.addEventListener(`keydown`, onEscapeCloseAdCard);
  map.insertBefore(card, mapFiltersContainer);
};

for (let i = 0; i < AD_NUMBER; i++) {
  const announcement = announcementsList[i];
  const pin = pinTemplate.cloneNode(true);
  pin.style = `left: ` + announcement.location.x + `%; top: ` +
    announcement.location.y + `px; transform: translate(-50%, -50%);`;
  const pinImage = pin.querySelector(`img`);
  pinImage.src = announcement.author.avatar;
  pinImage.alt = announcement.offer.title;
  pin.addEventListener(`click`, () => {
    if (!isAdCardOpen && isEnableStatus) {
      isAdCardOpen = true;
      renderAdCard(i);
    }
  });
  fragmentPins.appendChild(pin);

  /* const card = cardTemplate.cloneNode(true);
  const popupTitle = card.querySelector(`.popup__title`);
  popupTitle.textContent = announcement.offer.title;
  const popupTextAddress = card.querySelector(`.popup__text--address`);
  popupTextAddress.textContent = announcement.offer.address;
  const popupTextPrice = card.querySelector(`.popup__text--price`);
  popupTextPrice.textContent = announcement.offer.price + `₽/ночь`;
  const popupType = card.querySelector(`.popup__type`);
  popupType.textContent = EnglisHousingToRussian[announcement.offer.type];
  const popupTextCapacity = card.querySelector(`.popup__text--capacity`);
  popupTextCapacity.textContent = announcement.offer.rooms + ` комнаты для ` +
    announcement.offer.guests + ` гостей`;
  const popupTextTime = card.querySelector(`.popup__text--time`);
  popupTextTime.textContent = `Заезд после ` + announcement.offer.checkin +
    `, выезд до ` + announcement.offer.checkout;
  const popupFeatures = card.querySelector(`.popup__features`);
  popupFeatures.textContent = `Удобства: ` + EnglisfeatureToRussian[announcement.offer.features[0]];
  for (let i = 1; i < announcement.offer.features.length; i++) {
    popupFeatures.textContent += `, ` + EnglisfeatureToRussian[announcement.offer.features[i]];
  }
  const popupDescription = card.querySelector(`.popup__description`);
  popupDescription.textContent = announcement.offer.description;
  const popupPhotos = card.querySelector(`.popup__photos`);
  const popupPhoto = popupPhotos.querySelector(`.popup__photo`);
  popupPhoto.src = announcement.offer.photos[0];
  for (let i = 1; i < announcement.offer.photos.length; i++) {
    const newPopupPhoto = popupPhoto.cloneNode(true);
    newPopupPhoto.src = announcement.offer.photos[i];
    popupPhotos.appendChild(newPopupPhoto);
  }
  const popupAvatar = card.querySelector(`.popup__avatar`);
  popupAvatar.src = announcement.author.avatar;
  fragmnetCards.appendChild(card);
  const popupClose = card.querySelector(`.popup__close`);
  popupClose.addEventListener(`click`, closeAdCard);*/
}

const mapPins = map.querySelector(`.map__pins`);
mapPins.appendChild(fragmentPins);
makeDisableStatus();
const mapPinMain = mapPins.querySelector(`.map__pin--main`);
mapPinMain.addEventListener(`mousedown`, (evt) => {
  if (isMousedownLeft(evt)) {
    onMainPinMousedownLeft();
  }
});
mapPinMain.addEventListener(`keydown`, (evt) => {
  if (isKeyEnter(evt)) {
    onMainPinKeydownEnter();
  }
});
const adFormAddress = adForm.querySelector(`#address`);

adFormAddress.value = getPosition(mapPinMain);

adFormRoomsNumber.addEventListener(`input`, checkGuestsNumber);
adFormCapacity.addEventListener(`input`, checkGuestsNumber);
adFormTitle.addEventListener(`input`, checkTitle);
adFormType.addEventListener(`input`, checkPrice);
adFormPrice.addEventListener(`input`, checkPrice);
adFormTimein.addEventListener(`input`, syncTimeout);
adFormTimeout.addEventListener(`input`, syncTimein);
adFormAvatar.addEventListener(`input`, checkFormAvatar);
adFormImages.addEventListener(`input`, checkFormImages);
