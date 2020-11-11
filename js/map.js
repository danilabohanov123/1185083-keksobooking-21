"use strict";

(() => {
  let isAdCardOpen = false;

  window.map = {
    isAdCardOpen: isAdCardOpen
  };

  let card;

  window.map.card = card;

  const closeAdCard = function () {
    window.main.map.removeChild(window.map.card);
    window.map.isAdCardOpen = false;
  };

  window.map.closeAdCard = closeAdCard;

  const onEscapeCloseAdCard = function (evt) {
    if (window.util.isKeyEscape(evt)) {
      window.map.closeAdCard();
    }
    document.removeEventListener(`keydown`, window.map.onEscapeCloseAdCard);
  };

  window.map.onEscapeCloseAdCard = onEscapeCloseAdCard;

  const renderAdCard = (ind) => {
    const announcement = window.announcementsList[ind];
    window.map.card = window.main.cardTemplate.cloneNode(true);
    const popupTitle = window.map.card.querySelector(`.popup__title`);
    popupTitle.textContent = announcement.offer.title;
    const popupTextAddress = window.map.card.querySelector(`.popup__text--address`);
    popupTextAddress.textContent = announcement.offer.address;
    const popupTextPrice = window.map.card.querySelector(`.popup__text--price`);
    popupTextPrice.textContent = announcement.offer.price + `₽/ночь`;
    const popupType = window.map.card.querySelector(`.popup__type`);
    popupType.textContent = window.data.EnglisHousingToRussian[announcement.offer.type];
    const popupTextCapacity = window.map.card.querySelector(`.popup__text--capacity`);
    popupTextCapacity.textContent = announcement.offer.rooms + ` комнаты для ` +
      announcement.offer.guests + ` гостей`;
    const popupTextTime = window.map.card.querySelector(`.popup__text--time`);
    popupTextTime.textContent = `Заезд после ` + announcement.offer.checkin +
      `, выезд до ` + announcement.offer.checkout;
    const popupFeatures = window.map.card.querySelector(`.popup__features`);
    popupFeatures.textContent = `Удобства: ` + window.data.EnglisfeatureToRussian[announcement.offer.features[0]];
    for (let i = 1; i < announcement.offer.features.length; i++) {
      popupFeatures.textContent += `, ` + window.data.EnglisfeatureToRussian[announcement.offer.features[i]];
    }
    const popupDescription = window.map.card.querySelector(`.popup__description`);
    popupDescription.textContent = announcement.offer.description;
    const popupPhotos = window.map.card.querySelector(`.popup__photos`);
    const popupPhoto = popupPhotos.querySelector(`.popup__photo`);
    popupPhoto.src = announcement.offer.photos[0];
    for (let i = 1; i < announcement.offer.photos.length; i++) {
      const newPopupPhoto = popupPhoto.cloneNode(true);
      newPopupPhoto.src = announcement.offer.photos[i];
      popupPhotos.appendChild(newPopupPhoto);
    }
    const popupAvatar = window.map.card.querySelector(`.popup__avatar`);
    popupAvatar.src = announcement.author.avatar;
    const popupClose = window.map.card.querySelector(`.popup__close`);
    popupClose.addEventListener(`click`, () => {
      window.map.closeAdCard(card);
    });
    document.addEventListener(`keydown`, window.map.onEscapeCloseAdCard);
    window.main.map.insertBefore(window.map.card, window.main.mapFiltersContainer);
  };

  window.map.renderAdCard = renderAdCard;

  const fragmentPins = document.createDocumentFragment();

  for (let i = 0; i < window.data.AD_NUMBER; i++) {
    const announcement = window.announcementsList[i];
    const pin = window.main.pinTemplate.cloneNode(true);
    pin.style = `left: ` + announcement.location.x + `%; top: ` +
      announcement.location.y + `px; transform: translate(-50%, -50%);`;
    const pinImage = pin.querySelector(`img`);
    pinImage.src = announcement.author.avatar;
    pinImage.alt = announcement.offer.title;
    pin.addEventListener(`click`, () => {
      if (!window.map.isAdCardOpen && window.main.isEnableStatus) {
        window.map.isAdCardOpen = true;
        window.map.renderAdCard(i);
      }
    });
    fragmentPins.appendChild(pin);
  }

  window.main.mapPins.appendChild(fragmentPins);
})();
