"use strict";

const ObjNum = 8;
const typesList = [`palace`, `flat`, `house`, `bungalow`];
const featuresList = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const hotelphotos = [1, 2, 3];
const timesList = [`12:00`, `13:00`, `14:00`];

const genRandInt = (minNum, maxNum) => {
  return minNum + Math.round((Math.random() * (maxNum - minNum)));
};

const shuffle = (arr) => {
  const usedInd = [];
  for (let i = 0; i < arr.length; i++) {
    usedInd.push(false);
  }
  const shuffledArr = [];
  for (let i = 0; i < arr.length; i++) {
    const nextInd = genRandInt(1, arr.length - i);
    let falseCounter = 0;
    for (let j = 0; j < usedInd.length; j++) {
      if (!usedInd[j]) {
        falseCounter++;
        if (falseCounter === nextInd) {
          usedInd[j] = true;
          shuffledArr.push(arr[j]);
        }
      }
    }
  }
  return shuffledArr;
};

const listIndexes = [];
for (let i = 1; i <= ObjNum; i++) {
  listIndexes.push(i);
}

const listAvatarIndexes = shuffle(listIndexes);

const genAuthor = (avatar) => {
  return {avatar: avatar};
};

const genOffer = (title, address, price, type, rooms, guests, checkin, checkout, features,
    description, photos) => {
  return {title: title, address: address, price: price, type: type, rooms: rooms, guests: guests,
    checkin: checkin, checkout: checkout, features: features, description: description, photos: photos};
};

const genAvatar = (ind) => {
  return `img/avatars/user0` + listAvatarIndexes[ind] + `.png`;
};

const genTitle = (titleText) => {
  return titleText;
};

const genAdress = (x, y) => {
  return x + `, ` + y;
};

const genPrice = (minNumber, maxNumber) => {
  return genRandInt(minNumber, maxNumber);
};

const genTypes = () => {
  const typeInd = genRandInt(0, typesList.length - 1);
  return typesList[typeInd];
};

const genRooms = (roomsNumber) => {
  return roomsNumber;
};

const genGuests = (guestsNumber) => {
  return guestsNumber;
};

const genCheckin = () => {
  return timesList[genRandInt(0, typesList.length - 1)];
};

const genCheckout = () => {
  return timesList[genRandInt(0, typesList.length - 1)];
};

const genFeatures = () => {
  const hotelFeaturesSize = genRandInt(1, featuresList.length);
  const hotelFeatures = shuffle(featuresList).slice(0, hotelFeaturesSize);
  return hotelFeatures;
};

const genDescription = (descriptionText) => {
  return descriptionText;
};

const genPhotos = () => {
  const photoesListSize = genRandInt(1, hotelphotos.length);
  const photoesList = shuffle(typesList).slice(0, photoesListSize);
  return photoesList;
};

const genLocation = () => {
  return {x: genRandInt(0, 100), y: genRandInt(130, 630)};
};

const genAnnouncement = (ind) => {
  const author = genAuthor(genAvatar(ind));
  const location = genLocation();
  const offer = genOffer(genTitle(`Title`), genAdress(location.x, location.y), genPrice(100, 10000), genTypes(),
      genRooms(genRandInt(1, 10)), genGuests(genRandInt(1, 7)), genCheckin(), genCheckout(), genFeatures(),
      genDescription(`Some words about hotel.`), genPhotos());
  return {author: author, offer: offer, location: location};
};

const announcementsList = [];

for (let i = 0; i < ObjNum; i++) {
  announcementsList.push(genAnnouncement(i));
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
  pinImage.scr = announcement.offer.title;
  fragment.appendChild(pin);
}

const mapPins = map.querySelector(`.map__pins`);
mapPins.appendChild(fragment);
