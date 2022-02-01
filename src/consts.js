export const BLANK_POINT =  (
  { eventDate:  new Date(),
    dateFrom: new Date(),
    dateTo: new Date(),
    duration: '',
    basePrice: '',
    typeEvent: 'flight',
    offers: [],
    isFavorite: false,
  }
);

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};


export const eventTypes = [
  {id: 1, name: 'taxi'},
  {id: 2, name: 'bus'},
  {id: 3, name: 'train'},
  {id: 4, name: 'ship'},
  {id: 5, name: 'drive'},
  {id: 6, name: 'flight'},
  {id: 7, name: 'check-in'},
  {id: 8, name: 'sightseeing'},
  {id: 9, name: 'restaurant'},
];

export const MenuItem = {
  NEW_POINT: 'newPoint',
  TABLE: 'Table',
  STATS: 'Stats',
};

export const SortType = {
  DAY: 'DAY',
  EVENT: 'EVENT',
  TIME: 'TIME',
  PRICE: 'PRICE',
  OFFER: 'OFFER',
};

export const FilterType = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PAST: 'PAST',
};

export const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

export const ColorStatistic = {
  BACKGROUND: '#ffffff',
  FONT: '#000000',
  COLOR: '#000000',
};

