import {firstToUpperCase} from '../moki/utils.js';
import AbstractView from './abstract-view.js';

const createSortItemTemplate = (sort, isChecked) => {
  const {name, disabled} = sort;
  const isDisabledAttribute = disabled
    ? ' disabled'
    : '';

  return (
    `<div class="trip-sort__item  trip-sort__item--${name}">
      <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" ${isChecked ? 'checked' : ''} ${isDisabledAttribute}>
      <label class="trip-sort__btn" for="sort-${name}">${firstToUpperCase(name)}</label>
    </div>`
  );
};

const createSortTemplate = (sortItems) => {
  const sortItemsTemplate = sortItems
    .map((sort, index) => createSortItemTemplate(sort, index === 0))
    .join('');

  return `<h2 class="visually-hidden">Trip events</h2>
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortItemsTemplate}
    </form>`;
};

export default class SortView extends AbstractView {
  #element = null;
  #sorts = null;

  constructor(sorts) {
    super();
    this.#sorts = sorts;
  }

  get template() {
    return createSortTemplate(this.#sorts);
  }
}
