import {MenuItem} from './consts.js';
import {render, RenderPosition, remove} from './utils/render.js';

import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import InfoPresenter from './presenter/info-presenter.js';
import StatsView from './view/stats-view';
import ContolView from './view/control-view.js';
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

const pointsModel = new PointsModel(new ApiService(END_POINT, AUTHORIZATION));

const infoPresenter = new InfoPresenter(tripMainElement, pointsModel);
const filterModel = new FilterModel();
const tripPresenter = new TripPresenter(mainElement, pointsModel, filterModel);

tripPresenter.init();

const filterPresenter = new FilterPresenter(filterElement, filterModel, pointsModel);
filterPresenter.init();

const citeMenuClickHandle = (menuOptionName) => {

  const tableTabElement = siteMenuComponent.element.querySelector(`[data-menu = "${MenuItem.TABLE}"]`);
  const statsTabElement = siteMenuComponent.element.querySelector(`[data-menu = "${MenuItem.STATS}"]`);

  switch (menuOptionName) {
    case MenuItem.newPoint:
      remove(statisticsComponent);
      tripPresenter.destroy();
      tripPresenter.init();
      filterPresenter.destroy();
      filterPresenter.init();
      tripPresenter.createPointEvent();
      newPointBtn.disabled = true;
      tableTabElement.classList.add('trip-tabs__btn--active');
      statsTabElement.classList.remove('trip-tabs__btn--active');
      break;
    case MenuItem.TABLE:
      tripPresenter.destroy();
      tripPresenter.init();
      filterPresenter.destroy();
      filterPresenter.init();
      remove(statisticsComponent);
      newPointBtn.disabled = false;
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      filterPresenter.destroy();
      statisticsComponent = new StatsView(pointsModel.points);
      render(mainElement, statisticsComponent, RenderPosition.BEFOREEND);
      newPointBtn.disabled = false;
      break;
  }
};

pointsModel.init().finally(() => {
  infoPresenter.init();
  render(controlElement, siteMenuComponent, RenderPosition.AFTEREND);
  siteMenuComponent.setMenuClickHandler(citeMenuClickHandle);
});


newPointBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  document.addEventListener('keydown', () => {
  });

  citeMenuClickHandle(MenuItem.newPoint);

});
