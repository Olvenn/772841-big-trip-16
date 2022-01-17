import {generateDescription, descriptionsArray} from './moki/moki.js';
export const EVENT_COUNT = 3;

export const typePoint = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const EventTypes = [
  {name: 'taxi', iconURL: 'img/icons/taxi.png', offers: [1, 2]},
  {name: 'bus', iconURL: 'img/icons/bus.png', offers: [1, 4]},
  {name: 'train', iconURL: 'img/icons/train.png', offers: [1, 2, 3, 4]},
  {name: 'ship', iconURL: 'img/icons/ship.png', offers: [1, 2, 3, 4]},
  {name: 'drive', iconURL: 'img/icons/drive.png', offers: [2, 6]},
  {name: 'flight', iconURL: 'img/icons/flight.png', offers: [1, 2, 3, 4]},
  {name: 'check-in', iconURL: 'img/icons/check-in.png'},
  {name: 'sightseeing', iconURL: 'img/icons/sightseeing.png', offers: [6]},
  {name: 'restaurant', iconURL: 'img/icons/restaurant.png', offers: [3, 4]},
];

export const offersNames = [
  {name: 'comfort', description: 'Switch to comfort class'},
  {name: 'luggage', description: 'Add luggage'},
  {name: 'meal', description: 'Add meal'},
  {name: 'seats', description: 'Choose seats'},
  {name: 'train', description: 'Travel by train'},
  {name: 'Uber', description: 'Order Uber'},
];

export const EventTypesOffers = [
  {type: 't', offers: [{id: 0, title: 'Add', price: 30, isChecked: false}]},

  {type: 'taxi', offers: [{id: 1, title: 'Add luggage', price: 30, isChecked: false}, {id: 2, title: 'Switch to comfort class', price: 100, isChecked: false}]},
  {type: 'bus', offers: [{id: 3, title: 'Add luggage', price: 30, isChecked: false}, {id: 4, title: 'Choose seats', price: 5}]},
  {type: 'train', offers: [{id: 5, title: 'Add luggage', price: 30, isChecked: false}, {id: 6, title: 'Switch to comfort class', price: 100, isChecked: false}, {id: 7, title: 'Add meal', price: 15, isChecked: false}, {id: 8, title: 'Travel by train', price: 40, isChecked: false}]},
  {type: 'ship', offers: [{id: 9, title: 'Add luggage', price: 30, isChecked: false}, {id: 10, title: 'Switch to comfort class', price: 100, isChecked: false}, {id: 11, title: 'Add meal', price: 15, isChecked: false}, {id: 12, title: 'Choose seats', price: 5, isChecked: false}]},
  {type: 'drive', offers: [{id: 13, title: 'Switch to comfort class', price: 100, isChecked: false}, {id: 14, title: 'Order Uber', price: 20, isChecked: false}]},
  {type: 'flight',  offers: [{id: 15, title: 'Add luggage', price: 30, isChecked: false}, {id: 16, title: 'Switch to comfort class', price: 100, isChecked: false}, {id: 17, title: 'Add meal', price: 15, isChecked: false}, {id: 18, title: 'Choose seats', price: 5, isChecked: false}]},
  {type: 'check-in', offers: []},
  {type: 'sightseeing', offers: [{id: 19, title: 'Order Uber', price: 20, isChecked: false}]},
  {type: 'restaurant', offers: [{id: 20, title: 'Add meal', price: 15, isChecked: false}, {id: 21, title: 'Choose seats', price: 5, isChecked: false}]},
];

export const NAME_PLACES = [
  {name: 'Barcelona', description: generateDescription(descriptionsArray)},
  {name: 'Los Angeles', description: generateDescription(descriptionsArray)},
  {name: 'Madrid', description: generateDescription(descriptionsArray)},
  {name: 'Rome', description: generateDescription(descriptionsArray)},
  {name: 'Rio de Janeiro', description: generateDescription(descriptionsArray)},
];

export const MenuItem = {
  TABLE: 'Table',
  STATS: 'Stats'
};

export const SortType = {
  DAY: 'DAY',
  EVENT: 'EVENT',
  TIME: 'TIME',
  PRICE: 'PRICE',
  OFFER: 'OFFER'
};

export const SortSetting = [
  {name: 'day', dataSortType: 'DAY', disabled: false},
  {name: 'event', dataSortType: 'EVENT', disabled: true},
  {name: 'time', dataSortType: 'TIME', disabled: false},
  {name: 'price', dataSortType: 'PRICE', disabled: false},
  {name: 'offer', dataSortType: 'OFFER', disabled: true},
];

export const FilterType = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PAST: 'PAST',
};

export const NAME_PHOTOS = [
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '5.jpg',
];
