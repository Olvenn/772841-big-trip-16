import {NAME_PLACES} from '../consts.js';
import {getArrayWithDots, startFinishDays, getRandomInteger} from '../moki/utils.js';
import {createElement} from '../render.js';

const getTripInfoTitle = getArrayWithDots(NAME_PLACES).join(' &mdash; ');

const createInfoTemplate = () => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getTripInfoTitle}</h1>

      <p class="trip-info__dates">${startFinishDays()}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${getRandomInteger(500, 5000)}</span>
    </p>
  </section>`
);

export default class InfoView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createInfoTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
