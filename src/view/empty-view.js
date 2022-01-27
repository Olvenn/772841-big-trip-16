import AbstractView from './abstract-view.js';
import {FilterType} from '../consts.js';

const NoPointsMessageType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

const createEmptyTemplate = (FfilterType) => {
  const noPointsTextValue = NoPointsMessageType[FfilterType];
  return (
    `<p class="trip-events__msg">${noPointsTextValue}
    </p>`);
};

export default class EmptyView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  get template() {
    return createEmptyTemplate(this._data);
  }
}

