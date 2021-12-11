import {EVENT_COUNT, SortType} from './consts.js';
import {generateEvent} from './moki/moki.js';

import InfoView from './view/info-view.js';
import ContolView from './view/control-view.js';
import FilterView from './view/filter-view.js';
import SortrView from './view/sort-view.js';
import CoverContentView from './view/cover-content-view.js';
import PointView from './view/event-view.js';
import EditView from './view/edit-view';
import EmptyView from './view/empty-view';

import {render, RenderPosition} from './render.js';

const tripMainElement = document.querySelector('.trip-main');
const controlElement = document.querySelector('[data-view="control"]');
const filterElement = document.querySelector('[data-view="filter"]');
const sortHeaderElement = document.querySelector('[data-view="main"]');
const mainElement = document.querySelector('.trip-events');
const coverContentComponent = new CoverContentView();

const points = Array.from({length: EVENT_COUNT}, generateEvent);

render(tripMainElement, new InfoView().element, RenderPosition.AFTERBEGIN);
render(controlElement, new ContolView().element, RenderPosition.AFTEREND);
render(filterElement, new FilterView().element, RenderPosition.AFTEREND);
render(mainElement, coverContentComponent.element, RenderPosition.BEFOREEND);
render(sortHeaderElement, new SortrView(SortType).element, RenderPosition.AFTEREND);

const renderPoint = (pointListElement, point) => {

  const pointComponent = new PointView(point);
  const pointEditComponent = new EditView(point);


  const replaceCardToForm = () => {
    pointListElement.element.replaceChild(pointEditComponent.element, pointComponent.element);
  };

  const replaceFormToCard = () => {
    pointListElement.element.replaceChild(pointComponent.element, pointEditComponent.element);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceCardToForm();
  });

  pointEditComponent.element.querySelector('.event--edit').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.addEventListener('keydown', onEscKeyDown);
  });

  render(coverContentComponent.element, pointComponent.element, RenderPosition.BEFOREEND);
};

if (points.length === 0) {
  render(coverContentComponent.element, new EmptyView().element, RenderPosition.BEFOREEND);
} else {
  for (let i = 0; i < EVENT_COUNT; i++) {
    renderPoint(coverContentComponent, points[i]);
  }
}
