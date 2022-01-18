import {render, RenderPosition, remove} from '../utils/render.js';
import {sortByPrice, sortByDuration} from '../utils/common.js';
import {SortType} from '../consts.js';
import SortView from '../view/sort-view.js';
import CoverPointsView from '../view/cover-points-view.js';
import EmptyView from '../view/empty-view';
import {UserAction, UpdateType, FilterType} from '../consts.js';
import {filter} from '../utils/filter.js';


import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';

export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;
  #noPointsComponent = null;
  #newPointPresenter = null;
  #sortComponent = null;
  #filterModel = null;

  #pointPresenter = new Map();
  #coverPointsComponent = new CoverPointsView();

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;


  constructor(tripContainer, pointsModel, filterModel) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter(this.#coverPointsComponent, this.#handleViewAction);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;

    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints;
      case SortType.TIME:
        return filteredPoints.sort(sortByDuration);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
    }

    return filteredPoints;
  }


  init = () => {

    render(this.#tripContainer, this.#coverPointsComponent, RenderPosition.BEFOREEND);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#renderCoverPoints();
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleViewAction = (actionType, updateType, update) => {

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  }


  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearAll();
        this.#renderCoverPoints();
        break;
      case UpdateType.MAJOR:
        this.#clearAll(true);
        this.#renderCoverPoints();
        break;
    }
  }

  createPointEvent = (callback) => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(callback);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType= sortType;

    this.#clearAll();
    this.#renderCoverPoints();
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#tripContainer, this.#sortComponent, RenderPosition.AFTERBEGIN);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#coverPointsComponent, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }


  #renderPoints = () => {
    this.points.forEach((point) => this.#renderPoint(point));
  }

  #renderNoPoint = () => {
    this.#noPointsComponent = new EmptyView(this.#filterType);

    render(this.#coverPointsComponent, this.#noPointsComponent, RenderPosition.AFTERBEGIN);
  }

  #clearAll = (resetSortType = false) => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }

    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }
  }

  destroy = () => {
    this.#clearAll(true);

    remove(this.#coverPointsComponent);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }


  #renderCoverPoints = () => {
    if (this.points.length === 0) {
      this.#renderNoPoint();
      return;
    }

    this.#renderSort();
    this.#renderPoints();
  }
}
