import {FilterType} from '../consts.js';
import {firstToUpperCase} from '../moki/utils.js';
import {createElement} from '../render.js';

const createFilterTemplate = (filter) => (
  `<div class="trip-filters__filter">
                  <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
                  <label class="trip-filters__filter-label" for="filter-everything">${firstToUpperCase(filter)}</label>
                </div>`
);

const createFiltersTemplate = () => (
  `<form class="trip-filters" action="#" method="get">
                ${Object.values(FilterType).map((it) => createFilterTemplate(it)).join('\n')}

                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>`
);

export default class FilterView {
  #element = null;
  #filters = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }

  removeElement() {
    this.#element = null;
  }
}
