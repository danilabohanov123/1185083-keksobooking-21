"use strict";

(() => {
  const announcementsList = [];
  const listIndexes = [];

  const shuffleList = (itemsList) => {
    const usedIndexes = [];
    for (let i = 0; i < itemsList.length; i++) {
      usedIndexes.push(false);
    }
    const shuffledItemsList = [];
    for (let i = 0; i < itemsList.length; i++) {
      const nextIndex = window.util.generateRandomInteger(1, itemsList.length - i);
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

  for (let i = 1; i <= window.main.ADS_COUNT; i++) {
    listIndexes.push(i);
  }

  const listAvatarIndexes = shuffleList(listIndexes);

  const generateOffer = (title, address, price, type, rooms, guests, checkin, checkout, features,
      description, photos) => {
    return {title: title, address: address, price: price, type: type, rooms: rooms, guests: guests,
      checkin: checkin, checkout: checkout, features: features, description: description, photos: photos};
  };

  const generateTypes = () => {
    const typeInd = window.util.generateRandomInteger(0, window.main.hotelTypes.length - 1);
    return window.main.hotelTypes[typeInd];
  };

  const generateAccommodationOfGuests = () => {
    let roomsNumber = window.util.generateRandomInteger(1, 4);
    let guestsNumber = window.util.generateRandomInteger(roomsNumber, 3);
    if (roomsNumber === 4) {
      roomsNumber = 100;
      guestsNumber = 0;
    }
    return {rooms: roomsNumber, guests: guestsNumber};
  };

  const generateCheckin = () => {
    return window.main.hotelTimes[window.util.generateRandomInteger(0, window.main.hotelTimes.length - 1)];
  };

  const generateCheckout = () => {
    return window.main.hotelTimes[window.util.generateRandomInteger(0, window.main.hotelTimes.length - 1)];
  };

  const generateRandomSubarray = (arrayItems) => {
    const randomSubarraySize = window.util.generateRandomInteger(1, arrayItems.length);
    const randomSubarray = shuffleList(arrayItems).slice(0, randomSubarraySize);
    return randomSubarray;
  };

  const generateFeatures = () => {
    return generateRandomSubarray(window.main.hotelFeatures);
  };

  const generatePhotos = () => {
    const RandomSubarrayPhotos = generateRandomSubarray(window.main.hotelPhotos);
    for (let i = 0; i < RandomSubarrayPhotos.length; i++) {
      RandomSubarrayPhotos[i] = `http://o0.github.io/assets/images/tokyo/hotel` + RandomSubarrayPhotos[i] + `.jpg`;
    }
    return RandomSubarrayPhotos;
  };

  const generateLocation = () => {
    return {x: window.util.generateRandomInteger(0, 100), y: window.util.generateRandomInteger(130, 630)};
  };

  const generateAnnouncement = (ind) => {
    const author = {avatar: `img/avatars/user0` + listAvatarIndexes[ind] + `.png`};
    const location = generateLocation();
    const livingSetup = generateAccommodationOfGuests();
    const offer = generateOffer(`Title`, location.x + `, ` + location.y,
        window.util.generateRandomInteger(10000, 1000000), generateTypes(), livingSetup.rooms,
        livingSetup.guests, generateCheckin(), generateCheckout(),
        generateFeatures(), `Some words about hotel.`, generatePhotos());
    return {author: author, offer: offer, location: location};
  };

  for (let i = 0; i < window.main.ADS_COUNT; i++) {
    announcementsList.push(generateAnnouncement(i));
  }

  window.announcementsList = announcementsList;
})();
