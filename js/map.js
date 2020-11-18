"use strict";

(() => {
  const closeAdCard = function () {
    document.removeEventListener(`keydown`, window.map.onAdCardEscape);
    window.main.map.removeChild(window.main.card);
    window.main.card = undefined;
    window.map.isAdCardOpen = false;
    window.map.activePin.classList.remove(`map__pin--active`);
  };

  const onAdCardEscape = function (evt) {
    if (window.util.isKeyEscape(evt)) {
      window.map.closeAdCard();
    }
  };

  const renderPhotoes = (popupPhotos, offerPhotos) => {
    if (offerPhotos.length) {
      const popupPhoto = popupPhotos.querySelector(`.popup__photo`);
      if (offerPhotos[0]) {
        popupPhoto.src = offerPhotos[0];
      }
      for (let i = 1; i < offerPhotos.length; i++) {
        if (offerPhotos[i]) {
          const newPopupPhoto = popupPhoto.cloneNode(true);
          newPopupPhoto.src = offerPhotos[i];
          popupPhotos.appendChild(newPopupPhoto);
        }
      }
      return;
    }
    popupPhotos.remove();
  };

  const renderAdCard = (ind) => {
    const announcement = window.main.similarAnnouncements[ind];
    window.main.card = window.main.cardTemplate.cloneNode(true);
    const popupTitle = window.main.card.querySelector(`.popup__title`);
    popupTitle.textContent = announcement.offer.title;
    const popupTextAddress = window.main.card.querySelector(`.popup__text--address`);
    popupTextAddress.textContent = announcement.offer.address;
    const popupTextPrice = window.main.card.querySelector(`.popup__text--price`);
    popupTextPrice.textContent = announcement.offer.price + `₽/ночь`;
    const popupType = window.main.card.querySelector(`.popup__type`);
    popupType.textContent = window.main.EnglishHousingToRussian[announcement.offer.type];
    const popupTextCapacity = window.main.card.querySelector(`.popup__text--capacity`);
    popupTextCapacity.textContent = announcement.offer.rooms + ` комнаты для ` +
      announcement.offer.guests + ` гостей`;
    const popupTextTime = window.main.card.querySelector(`.popup__text--time`);
    popupTextTime.textContent = `Заезд после ` + announcement.offer.checkin +
      `, выезд до ` + announcement.offer.checkout;
    const popupFeatures = window.main.card.querySelector(`.popup__features`);
    const features = {
      wifi: popupFeatures.querySelector(`.popup__feature--wifi`),
      dishwasher: popupFeatures.querySelector(`.popup__feature--dishwasher`),
      parking: popupFeatures.querySelector(`.popup__feature--parking`),
      washer: popupFeatures.querySelector(`.popup__feature--washer`),
      elevator: popupFeatures.querySelector(`.popup__feature--elevator`),
      conditioner: popupFeatures.querySelector(`.popup__feature--conditioner`)
    };
    const usedFeatures = {};
    Object.keys(features).forEach((element) => {
      usedFeatures[element] = false;
    });
    announcement.offer.features.forEach((element) => {
      usedFeatures[element] = true;
    });
    Object.keys(usedFeatures).forEach((element) => {
      if (!usedFeatures[element]) {
        features[element].remove();
      }
    });
    if (!popupFeatures.querySelector(`.popup__feature`)) {
      popupFeatures.remove();
    }
    const popupDescription = window.main.card.querySelector(`.popup__description`);
    popupDescription.textContent = announcement.offer.description;
    const popupPhotos = window.main.card.querySelector(`.popup__photos`);
    window.map.renderPhotoes(popupPhotos, announcement.offer.photos);
    const popupAvatar = window.main.card.querySelector(`.popup__avatar`);
    popupAvatar.src = announcement.author.avatar;
    const popupClose = window.main.card.querySelector(`.popup__close`);
    popupClose.addEventListener(`click`, () => {
      window.map.closeAdCard(window.main.card);
    });
    document.addEventListener(`keydown`, window.map.onAdCardEscape);
    window.main.map.insertBefore(window.main.card, window.main.mapFiltersContainer);
  };

  const renderPins = () => {
    window.mode.isPinsdDrawn = true;

    for (let i = 0; i < Math.min(window.main.similarAnnouncements.length, window.main.PINS_LIMIT); i++) {
      const announcement = window.main.similarAnnouncements[i];
      const pin = window.main.pinTemplate.cloneNode(true);
      pin.style = `left: ` + announcement.location.x + `px; top: ` +
        announcement.location.y + `px; transform: translate(-50%, -50%);`;
      const pinImage = pin.querySelector(`img`);
      pinImage.src = announcement.author.avatar;
      pinImage.alt = announcement.offer.title;
      pin.addEventListener(`click`, () => {
        if (window.main.isEnableStatus && window.main.similarAnnouncements[i].offer) {
          if (window.map.isAdCardOpen) {
            window.map.closeAdCard();
          }
          window.map.activePin = pin;
          window.map.activePin.classList.add(`map__pin--active`);
          window.map.isAdCardOpen = true;
          window.map.renderAdCard(i);
        }
      });
      window.main.mapPins.appendChild(pin);
      window.map.pins.push(pin);
    }
  };

  const deletePins = () => {
    for (let i = 0; i < window.map.pins.length; i++) {
      window.map.pins[i].remove();
    }
    window.main.pins = [];
    if (window.map.isAdCardOpen) {
      window.map.closeAdCard();
    }
  };

  window.map = {
    isAdCardOpen: false,
    card: undefined,
    closeAdCard: closeAdCard,
    onAdCardEscape: onAdCardEscape,
    renderAdCard: renderAdCard,
    renderPins: renderPins,
    deletePins: deletePins,
    renderPhotoes: renderPhotoes,
    pins: [],
    activePin: undefined
  };
})();
