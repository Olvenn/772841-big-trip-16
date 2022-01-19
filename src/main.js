import {MenuItem} from './consts.js';

import ContolView from './view/control-view.js';

import {render, RenderPosition, remove} from './utils/render.js';
import PointsModel from './model/points-model.js';

import FilterModel from './model/filter-model.js';

import TripPresenter from './presenter/trip-presenter.js';

import FilterPresenter from './presenter/filter-presenter.js';

import InfoPresenter from './presenter/info-presenter.js';

import StatsView from './view/stats-view';

import ApiService from './api-service.js';


const AUTHORIZATION = 'Basic 1q2w3e4r5t';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';

const tripMainElement = document.querySelector('.trip-main');
const controlElement = document.querySelector('.trip-controls__navigation');
const filterElement = document.querySelector('[data-view="filter"]');
const newPointBtn = document.querySelector('.trip-main__event-add-btn');
const mainElement = document.querySelector('.trip-events');

const siteMenuComponent = new ContolView();
let statisticsComponent = null;
// render(tripMainElement, new InfoView(), RenderPosition.AFTERBEGIN);
// render(filterElement, new FilterView(), RenderPosition.AFTEREND);


const pointsModel = new PointsModel(new ApiService(END_POINT, AUTHORIZATION));

const infoPresenter = new InfoPresenter(tripMainElement, pointsModel);
const filterModel = new FilterModel();
const tripPresenter = new TripPresenter(mainElement, pointsModel, filterModel);

tripPresenter.init();

const filterPresenter = new FilterPresenter(filterElement, filterModel, pointsModel);
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

pointsModel.init().finally(() => {
  render(controlElement, siteMenuComponent, RenderPosition.AFTEREND);
  siteMenuComponent.setMenuClickHandler(citeMenuClickHandle);
});

