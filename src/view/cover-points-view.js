import AbstractView from './abstract-view.js';

const createCoverPointsTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class CoverPointsView extends AbstractView {
  #element = null;

  get template() {
    return createCoverPointsTemplate();
  }
}
