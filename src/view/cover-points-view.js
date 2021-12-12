import {createElement} from '../render.js';

const createCoverContentTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);


export default class CoverContentView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createCoverContentTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
