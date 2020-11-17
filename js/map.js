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
    if (!announcement.offer.features.length) {
      popupFeatures.remove();
    } else {
      popupFeatures.textContent = `Удобства: ` + window.main.EnglishFeatureToRussian[announcement.offer.features[0]];
    }
    for (let i = 1; i < announcement.offer.features.length; i++) {
      popupFeatures.textContent += `, ` + window.main.EnglishFeatureToRussian[announcement.offer.features[i]];
    }
    const popupDescription = window.main.card.querySelector(`.popup__description`);
    popupDescription.textContent = announcement.offer.description;
    const popupPhotos = window.main.card.querySelector(`.popup__photos`);
    if (announcement.offer.photos.length) {
      const popupPhoto = popupPhotos.querySelector(`.popup__photo`);
      if (announcement.offer.photos[0]) {
        popupPhoto.src = announcement.offer.photos[0];
      }
      for (let i = 1; i < announcement.offer.photos.length; i++) {
        if (announcement.offer.photos[i]) {
          const newPopupPhoto = popupPhoto.cloneNode(true);
          newPopupPhoto.src = announcement.offer.photos[i];
          popupPhotos.appendChild(newPopupPhoto);
        }
      }
    } else {
      popupPhotos.remove();
    }
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
    pins: [],
    activePin: undefined
  };
})();
