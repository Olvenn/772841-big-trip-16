import AbstractView from './abstract-view.js';
import {MenuItem} from '../consts.js';

const createContolTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
                  <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-menu = "${MenuItem.TABLE}">${MenuItem.TABLE}</a>
                  <a class="trip-tabs__btn" href="#" data-menu = "${MenuItem.STATS}">${MenuItem.STATS}</a>
                </nav>`
);

export default class ContolView extends AbstractView {

  constructor() {
    super();
  }

  get template() {
    return createContolTemplate();
  }

  #menuClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.menu);


    if (!evt.target.classList.contains('trip-tabs__btn--active')) {
      const prevActiveMenuOption = this.element.querySelector('.trip-tabs__btn--active');

      evt.target.classList.add('trip-tabs__btn--active');
      prevActiveMenuOption.classList.remove('trip-tabs__btn--active');

    }
  }

  setMenuClickHandler = (callback) => {
    this._callback.menuClick = callback;
    this.element.addEventListener('click', this.#menuClickHandler);
  }
}
