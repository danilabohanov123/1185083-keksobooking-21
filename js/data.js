"use strict";

(() => {
  const AD_NUMBER = 8;
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

  window.data = {
    AD_NUMBER: AD_NUMBER,
    hotelTypes: hotelTypes,
    hotelFeatures: hotelFeatures,
    hotelPhotos: hotelPhotos,
    hotelTimes: hotelTimes,
    EnglisHousingToRussian: EnglisHousingToRussian,
    EnglisfeatureToRussian: EnglisfeatureToRussian
  };
})();
