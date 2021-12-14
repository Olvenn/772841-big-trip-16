import {EVENT_COUNT, SortType} from './consts.js';
import {generateEvent} from './moki/moki.js';

import InfoView from './view/info-view.js';
import ContolView from './view/control-view.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import CoverPointsView from './view/cover-points-view.js';
import PointView from './view/point-view.js';
import EditView from './view/edit-view';
import EmptyView from './view/empty-view';

import {render, RenderPosition, replace} from './utils/render.js';

const tripMainElement = document.querySelector('.trip-main');
const controlElement = document.querySelector('[data-view="control"]');
const filterElement = document.querySelector('[data-view="filter"]');
const mainElement = document.querySelector('.trip-events');

const points = Array.from({length: EVENT_COUNT}, generateEvent);

render(tripMainElement, new InfoView(), RenderPosition.AFTERBEGIN);
render(controlElement, new ContolView(), RenderPosition.AFTEREND);
render(filterElement, new FilterView(), RenderPosition.AFTEREND);

const renderTrip = (tripContainer, allPoints) => {
  const coverPointsComponent = new CoverPointsView();

  render(tripContainer, coverPointsComponent, RenderPosition.BEFOREEND);
  render(tripContainer, new SortView(SortType), RenderPosition.AFTERBEGIN);

  const renderPoint = (pointListElement, point) => {
    const pointComponent = new PointView(point);
    const pointEditComponent = new EditView(point);

    const replaceCardToForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToCard = () => {
      replace(pointComponent, pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointListElement, pointComponent, RenderPosition.BEFOREEND);
  };

  if (allPoints.length === 0) {
    render(coverPointsComponent, new EmptyView(), RenderPosition.BEFOREEND);
  } else {
    for (let i = 0; i < EVENT_COUNT; i++) {
      renderPoint(coverPointsComponent, allPoints[i]);
    }
  }
};

renderTrip(mainElement, points);

