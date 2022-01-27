import {UserAction, UpdateType, FilterType, SortType, BLANK_POINT, State as tripState}  from '../consts.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {sortByDay, sortByPrice, sortByDuration} from '../utils/sort.js';
import SortView from '../view/sort-view.js';
import CoverPointsView from '../view/cover-points-view.js';
import EmptyView from '../view/empty-view';
import {filter} from '../utils/filter.js';
import LoadingView from '../view/loading-view.js';
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
  #loadingComponent = new LoadingView();

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;

  constructor(tripContainer, pointsModel, filterModel) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#newPointPresenter = new NewPointPresenter(this.#coverPointsComponent, this.#handleViewAction);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;

    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortByDay);
      case SortType.TIME:
        return filteredPoints.sort(sortByDuration);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
    }

    return filteredPoints;
  }

  init = () => {

    render(this.#tripContainer, this.#coverPointsComponent, RenderPosition.BEFOREEND);

    this.#renderCoverPoints();
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleViewAction = async (actionType, updateType, update) => {

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setViewState(tripState.SAVING);

        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setViewState(tripState.ABORTING);
        }

        break;

      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();

        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#pointsModel.setAborting();
        }

        break;

      case UserAction.DELETE_POINT:
        this.#pointPresenter.get(update.id).setViewState(tripState.DELETING);

        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setViewState(tripState.ABORTING);
        }

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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderCoverPoints();
        break;
    }
  }

  createPointEvent = () => {
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(BLANK_POINT, this.#pointsModel.destination, this.#pointsModel.offers);
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
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#tripContainer, this.#sortComponent, RenderPosition.AFTERBEGIN);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#coverPointsComponent, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point, this.#pointsModel.destination, this.#pointsModel.offers);
    this.#pointPresenter.set(point.id, pointPresenter);

  }

  #renderPoints = () => {
    this.points.forEach((point) => this.#renderPoint(point));
  }

  #renderLoading = () => {
    render(this.#coverPointsComponent, this.#loadingComponent, RenderPosition.AFTERBEGIN);
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
    remove(this.#loadingComponent);

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
    remove(this.#sortComponent);

    this.#pointsModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);
  }

  #renderCoverPoints = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.points.length === 0) {
      this.#renderNoPoint();
      return;
    }

    this.#renderSort();
    this.#renderPoints();
  }
}
