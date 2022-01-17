import {EVENT_COUNT, MenuItem} from './consts.js';
import {generateEvent} from './moki/moki.js';

import ContolView from './view/control-view.js';

import {render, RenderPosition, remove} from './utils/render.js';
import PointsModel from './model/points-model.js';

import FilterModel from './model/filter-model.js';

import TripPresenter from './presenter/trip-presenter.js';

import FilterPresenter from './presenter/filter-presenter.js';

import InfoPresenter from './presenter/info-presenter.js';

import StatsView from './view/stats-view';

const tripMainElement = document.querySelector('.trip-main');
const controlElement = document.querySelector('.trip-controls__navigation');
const filterElement = document.querySelector('[data-view="filter"]');
const newPointBtn = document.querySelector('.trip-main__event-add-btn');

const siteMenuComponent = new ContolView();
let statisticsComponent = null;
// render(tripMainElement, new InfoView(), RenderPosition.AFTERBEGIN);
render(controlElement, siteMenuComponent, RenderPosition.AFTEREND);
// render(filterElement, new FilterView(), RenderPosition.AFTEREND);


const mainElement = document.querySelector('.trip-events');

const points = Array.from({length: EVENT_COUNT}, generateEvent);

const pointsModel = new PointsModel();
pointsModel.points = points;

const infoPresenter = new InfoPresenter(tripMainElement, pointsModel);
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(mainElement, pointsModel, filterModel);

tripPresenter.init();

const filterPresenter = new FilterPresenter(filterElement, filterModel);
filterPresenter.init();

infoPresenter.init();

newPointBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPointEvent();
});

const citeMenuClickHandle = (menuOptionName) => {

  switch (menuOptionName) {
    case MenuItem.TABLE:
      tripPresenter.destroy();
      tripPresenter.init();
      filterPresenter.destroy();
      filterPresenter.init();
      remove(statisticsComponent);
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      filterPresenter.destroy();

      statisticsComponent = new StatsView();
      render(tripMainElement, statisticsComponent, RenderPosition.AFTEREND);
      break;
  }

};

siteMenuComponent.setMenuClickHandler(citeMenuClickHandle);

