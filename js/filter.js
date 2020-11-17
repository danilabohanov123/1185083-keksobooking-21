"use strict";

(() => {
  const isSimilarFeatures = (features) => {
    for (const clientFeture of window.main.SortingParameters.features) {
      let isfeatureSuitable = false;
      for (const feature of features) {
        if (feature === clientFeture) {
          isfeatureSuitable = true;
          break;
        }
      }
      if (!isfeatureSuitable) {
        return false;
      }
    }
    return true;
  };

  const getSimilarAds = () => {
    window.main.similarAnnouncements = [];
    const announcementsFlags = [];
    for (let i = 0; i < window.download.announcements.length; i++) {
      announcementsFlags.push(true);
    }
    if (window.main.SortingParameters.type !== window.main.DEFAULT_INPUT_VALUE) {
      for (let i = window.download.announcements.length - 1; i >= 0; i--) {
        if (window.download.announcements[i].offer.type !== window.main.SortingParameters.type) {
          announcementsFlags[i] = false;
        }
      }
    }
    for (let i = window.download.announcements.length - 1; i >= 0; i--) {
      if (window.download.announcements[i].offer.price > window.main.SortingParameters.maxPrice ||
        window.main.SortingParameters.minPrice > window.download.announcements[i].offer.price) {
        announcementsFlags[i] = false;
      }
    }
    if (window.main.SortingParameters.roomsNumber !== window.main.DEFAULT_INPUT_VALUE) {
      for (let i = window.download.announcements.length - 1; i >= 0; i--) {
        if (window.download.announcements[i].offer.rooms !== parseInt(window.main.SortingParameters.roomsNumber, window.main.BASE)) {
          announcementsFlags[i] = false;
        }
      }
    }
    if (window.main.SortingParameters.guestsNumber !== window.main.DEFAULT_INPUT_VALUE) {
      for (let i = window.download.announcements.length - 1; i >= 0; i--) {
        if (window.download.announcements[i].offer.guests !== parseInt(window.main.SortingParameters.guestsNumber, window.main.BASE)) {
          announcementsFlags[i] = false;
        }
      }
    }
    if (window.main.SortingParameters.features.length) {
      for (let i = window.download.announcements.length - 1; i >= 0; i--) {
        if (!window.filter.isSimilarFeatures(window.download.announcements[i].offer.features)) {
          announcementsFlags[i] = false;
        }
      }
    }
    for (let i = 0; i < window.download.announcements.length; i++) {
      if (announcementsFlags[i]) {
        window.main.similarAnnouncements.push(window.download.announcements[i]);
      }
    }
  };

  const rerenderPins = window.util.debounce(function () {
    window.filter.getSimilarAds();
    window.map.deletePins();
    window.map.renderPins();
  });

  window.filter = {
    isSimilarFeatures: isSimilarFeatures,
    getSimilarAds: getSimilarAds,
    rerenderPins: rerenderPins,
  };

  window.main.mapFiltersType.addEventListener(`input`, () => {
    window.main.SortingParameters.type = window.main.mapFiltersType.value;
    if (window.main.isDataDownload) {
      window.filter.rerenderPins();
    }
  });

  window.main.mapFiltersPrice.addEventListener(`input`, () => {
    if (window.main.mapFiltersPrice.value === window.main.DEFAULT_INPUT_VALUE) {
      window.main.SortingParameters.minPrice = 0;
      window.main.SortingParameters.maxPrice = 2000000000;
    } else if (window.main.mapFiltersPrice.value === `middle`) {
      window.main.SortingParameters.minPrice = 10000;
      window.main.SortingParameters.maxPrice = 50000;
    } else if (window.main.mapFiltersPrice.value === `low`) {
      window.main.SortingParameters.minPrice = 0;
      window.main.SortingParameters.maxPrice = 9999;
    } else {
      window.main.SortingParameters.minPrice = 50001;
      window.main.SortingParameters.maxPrice = 2000000000;
    }
    if (window.main.isDataDownload) {
      window.filter.rerenderPins();
    }
  });

  window.main.mapFiltersRooms.addEventListener(`input`, () => {
    window.main.SortingParameters.roomsNumber = window.main.mapFiltersRooms.value;
    if (window.main.isDataDownload) {
      window.filter.rerenderPins();
    }
  });

  window.main.mapFiltersGuests.addEventListener(`input`, () => {
    window.main.SortingParameters.guestsNumber = window.main.mapFiltersGuests.value;
    if (window.main.isDataDownload) {
      window.filter.rerenderPins();
    }
  });

  for (const feature of window.main.mapFiltersFeatures) {
    feature.addEventListener(`input`, () => {
      window.main.SortingParameters.features = [];
      for (const filterCheckbox of window.main.mapFiltersFeatures) {
        if (filterCheckbox.checked) {
          window.main.SortingParameters.features.push(filterCheckbox.value);
        }
      }
      if (window.main.isDataDownload) {
        window.filter.rerenderPins();
      }
    });
  }
})();
