import {render, RenderPosition} from '../utils/render.js';
import {sortByPrice, sortByDuration} from '../utils/common.js';
import {SortType, SortSetting} from '../consts.js';
import SortView from '../view/sort-view.js';
import CoverPointsView from '../view/cover-points-view.js';
import EmptyView from '../view/empty-view';
import {updateItem} from '../moki/utils.js';

import PointPresenter from './point-presenter.js';

export default class TripPresenter {
  #tripContainer = null;

  #coverPointsComponent = new CoverPointsView();
  #sortComponent = new SortView(SortSetting);
  #noPointComponent = new EmptyView();

  #tripPoints = [];
  #pointPresenter = new Map();

  #currentSortType = SortType.DAY;

  #sourcedPoints = [];

  constructor(tripContainer) {
    this.#tripContainer = tripContainer;
  }

  init = (tripPoints) => {

    this.#tripPoints = [...tripPoints];

    this.#sourcedPoints = [...tripPoints];

    render(this.#tripContainer, this.#coverPointsComponent, RenderPosition.BEFOREEND);

    this.#renderCoverPoints();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleTaskChange = (updatedPoint) => {

    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#sourcedPoints = updateItem(this.#sourcedPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  #sortPoints = (sortType) => {

    switch (sortType) {
      case SortType.TIME:
        this.#tripPoints.sort(sortByDuration);
        break;
      case SortType.PRICE:
        this.#tripPoints.sort(sortByPrice);
        break;
      default:

        this.#tripPoints = [...this.#sourcedPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearTaskList();
    this.#renderPoints();
  }

  #renderSort = () => {
    render(this.#tripContainer, this.#sortComponent, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripContainer, this.#handleTaskChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints = () => {
    this.#tripPoints.forEach((point) => this.#renderPoint(point));
  }

  #clearTaskList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #renderNoPoint = () => {
    render(this.#coverPointsComponent, this.#noPointComponent, RenderPosition.AFTERBEGIN);
  }

  #renderCoverPoints = () => {
    if (this.#tripPoints.length === 0) {
      this.#renderNoPoint();
    }

    this.#renderSort();
    this.#renderPoints();
  }
}
