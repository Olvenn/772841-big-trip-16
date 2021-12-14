import {NAME_PLACES} from '../consts.js';
import {getArrayWithDots, startFinishDays} from '../moki/utils.js';
import {getRandomInteger} from '../utils/common.js';
import AbstractView from './abstract-view.js';

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

export default class InfoView extends AbstractView {

  get template() {
    return createInfoTemplate();
  }
}
