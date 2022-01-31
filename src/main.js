import {EVENT_COUNT} from './consts.js';
import {generateEvent} from './moki/moki.js';

import InfoView from './view/info-view.js';
import ContolView from './view/control-view.js';
import FilterView from './view/filter-view.js';
import {render, RenderPosition} from './utils/render.js';

import TripPresenter from './presenter/trip-presenter.js';

const tripMainElement = document.querySelector('.trip-main');
const controlElement = document.querySelector('[data-view="control"]');
const filterElement = document.querySelector('[data-view="filter"]');

render(tripMainElement, new InfoView(), RenderPosition.AFTERBEGIN);
render(controlElement, new ContolView(), RenderPosition.AFTEREND);
render(filterElement, new FilterView(), RenderPosition.AFTEREND);

const mainElement = document.querySelector('.trip-events');

const points = Array.from({length: EVENT_COUNT}, generateEvent);

const tripPresenter = new TripPresenter(mainElement);
tripPresenter.init(points);
