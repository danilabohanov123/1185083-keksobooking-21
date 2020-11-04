"use strict";

const OBJECTS_NUMBER = 8;

const typesList = [`palace`, `flat`, `house`, `bungalow`];
const featuresList = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const hotelPhotos = [1, 2, 3];
const timesList = [`12:00`, `13:00`, `14:00`];

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
for (let i = 1; i <= OBJECTS_NUMBER; i++) {
  listIndexes.push(i);
}

const listAvatarIndexes = shuffleList(listIndexes);

const generateOffer = (title, address, price, type, rooms, guests, checkin, checkout, features,
    description, photos) => {
  return {title: title, address: address, price: price, type: type, rooms: rooms, guests: guests,
    checkin: checkin, checkout: checkout, features: features, description: description, photos: photos};
};

const generateTypes = () => {
  const typeInd = generateRandomInteger(0, typesList.length - 1);
  return typesList[typeInd];
};

const generateRooms = (roomsNumber) => {
  return roomsNumber;
};

const generateGuests = (guestsNumber) => {
  return guestsNumber;
};

const generateCheckin = () => {
  return timesList[generateRandomInteger(0, typesList.length - 1)];
};

const generateCheckout = () => {
  return timesList[generateRandomInteger(0, typesList.length - 1)];
};

const generateRandomSubarray = (arrayItems) => {
  const randomSubarraySize = generateRandomInteger(1, arrayItems.length);
  const randomSubarray = shuffleList(arrayItems).slice(0, randomSubarraySize);
  return randomSubarray;
};

const generateFeatures = () => {
  return generateRandomSubarray(featuresList);
};

const generateDescription = (descriptionText) => {
  return descriptionText;
};

const generatePhotos = () => {
  return generateRandomSubarray(hotelPhotos);
};

const generateLocation = () => {
  return {x: generateRandomInteger(0, 100), y: generateRandomInteger(130, 630)};
};

const generateAnnouncement = (ind) => {
  const author = {avatar: `img/avatars/user0` + listAvatarIndexes[ind] + `.png`};
  const location = generateLocation();
  const offer = generateOffer(`Title`, location.x + `, ` + location.y,
      generateRandomInteger(100, 10000), generateTypes(), generateRooms(generateRandomInteger(1, 10)),
      generateGuests(generateRandomInteger(1, 7)), generateCheckin(), generateCheckout(),
      generateFeatures(), generateDescription(`Some words about hotel.`), generatePhotos());
  return {author: author, offer: offer, location: location};
};

const announcementsList = [];

for (let i = 0; i < OBJECTS_NUMBER; i++) {
  announcementsList.push(generateAnnouncement(i));
}

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`button`);
const fragment = document.createDocumentFragment();

for (const announcement of announcementsList) {
  const pin = pinTemplate.cloneNode(true);
  pin.style = `left: ` + announcement.location.x + `%; top: ` + announcement.location.y + `px; transform: translate(-50%, -50%);`;
  const pinImage = pin.querySelector(`img`);
  pinImage.src = announcement.author.avatar;
  pinImage.alt = announcement.offer.title;
  fragment.appendChild(pin);
}

const mapPins = map.querySelector(`.map__pins`);
mapPins.appendChild(fragment);
