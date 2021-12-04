export const EVENT_COUNT = 3;

export const typePoint = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

export const offers = [
  {id: 1, name: 'luggage', description: 'Add luggage', price: 30, isChecked: true, isDisabled: false},
  {id: 2, name: 'comfort', description: 'Switch to comfort class', price: 100, isChecked: true, isDisabled: false},
  {id: 3, name: 'meal', description: 'Add meal', price: 15, isChecked: false, isDisabled: false},
  {id: 4, name: 'seats', description: 'Choose seats', price: 5, isChecked: false, isDisabled: false},
  {id: 5, name: 'train', description: 'Travel by train', price: 40, isChecked: false, isDisabled: true},
];

export const EventTypes = [
  {name: 'taxi', iconURL: 'img/icons/taxi.png'},
  {name: 'bus', iconURL: 'img/icons/bus.png'},
  {name: 'train', iconURL: 'img/icons/train.png'},
  {name: 'ship', iconURL: 'img/icons/ship.png'},
  {name: 'drive', iconURL: 'img/icons/drive.png'},
  {name: 'flight', iconURL: 'img/icons/flight.png'},
  {name: 'check-in', iconURL: 'img/icons/check-in.png'},
  {name: 'sightseeing', iconURL: 'img/icons/sightseeing.png'},
  {name: 'restaurant', iconURL: 'img/icons/restaurant.png'},
];

export const NAME_PLACES = [
  'Barcelona',
  'Los Angeles',
  'Madrid',
  'Rome',
  'Rio de Janeiro',
];

export const MenuItem = {
  TABLE: 'Table',
  STATS: 'Stats'
};

export const SortType = [
  {name: 'day', disabled: false},
  {name: 'event', disabled: true},
  {name: 'time', disabled: false},
  {name: 'price', disabled: false},
  {name: 'offer', disabled: true},
];

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const NAME_PHOTOS = [
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '5.jpg',
];
