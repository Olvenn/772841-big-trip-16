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


export const EventTypes = [
  {name: 'taxi'},
  {name: 'bus'},
  {name: 'train'},
  {name: 'ship'},
  {name: 'drive'},
  {name: 'flight'},
  {name: 'check-in'},
  {name: 'sightseeing'},
  {name: 'restaurant'},
];

export const MenuItem = {
  NEW_EVENT: 'newPoint',
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

export const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};
