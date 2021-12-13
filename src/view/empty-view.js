import AbstractView from './abstract-view.js';

const createEmptyTemplate = () => (
  `<p class="trip-events__msg">Click New Event to create your first point
  </p>`
);

export default class EmptyView extends AbstractView {
  #element = null;

  get template() {
    return createEmptyTemplate();
  }
}
