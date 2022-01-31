import AbstractView from './abstract-view.js';
import {firstToUpperCase} from '../moki/utils.js';

const createSortItemTemplate = (sort, isChecked) => {
  const {dataSortType, name, disabled} = sort;
  const isDisabledAttribute = disabled
    ? ' disabled'
    : '';

  return (
    `<div class="trip-sort__item  trip-sort__item--${name}" >
      <input data-sort-type="${dataSortType}" id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" ${isChecked ? 'checked' : ''} ${isDisabledAttribute}">
      <label class="trip-sort__btn" for="sort-${name}">${firstToUpperCase(name)}</label>
    </div>`
  );
};

const createSortTemplate = (sortItems) => {
  const sortItemsTemplate = sortItems
    .map((sort, index) => createSortItemTemplate(sort, index === 0))
    .join('');

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortItemsTemplate}
    </form>`;
};

export default class SortView extends AbstractView {

  #sorts = null;

  constructor(sorts) {
    super();
    this.#sorts = sorts;
  }

  get template() {
    return createSortTemplate(this.#sorts);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    if (!evt.target.classList.contains('trip-sort__input')) {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }
}
