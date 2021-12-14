import AbstractView from './abstract-view.js';

const createCoverMenuTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class CoverMenuView extends AbstractView {
  #element = null;

  get template() {
    return createCoverMenuTemplate();
  }
}
