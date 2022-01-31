import {FilterType} from '../consts.js';
import {firstToUpperCase} from '../moki/utils.js';
import AbstractView from './abstract-view.js';

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

export default class FilterView extends AbstractView {

  #filters = null;

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}
