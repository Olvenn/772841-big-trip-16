import {NAME_PLACES} from '../consts.js';
import {getArrayWithDots, startFinishDays} from '../moki/utils.js';
import AbstractView from './abstract-view.js';

const getTripInfoTitle = getArrayWithDots(Object.values(NAME_PLACES.map((el) => el.name))).join(' &mdash; ');

const createInfoTemplate = (point) => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getTripInfoTitle}</h1>

      <p class="trip-info__dates">${startFinishDays()}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${point.totalPrice}</span>
    </p>
  </section>`
);

export default class InfoView extends AbstractView {
  #data = null;

  constructor(data) {
    super();
    this.#data = data;
  }

  get template() {
    return createInfoTemplate(this.#data);
  }
}
