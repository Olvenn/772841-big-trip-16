import InfoView from '../view/info-view.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';

export default class InfoPresenter {
  #infoContaner = null;
  #pointsModel = null;
  #infoComponent = null;

  constructor(infoContaner, pointsModel) {
    this.#infoContaner = infoContaner;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#infoModelHendler);
  }

  init = () => {
    const points = this.#pointsModel.points;
    // console.log('info-presenter', this.#pointsModel.points);

    const prevInfoComponent = this.#infoComponent;

    this.#infoComponent = new InfoView(this.#pointsModel.points);


    if (!points.length && prevInfoComponent === null) {
      return;
    }

    if (!points.length && prevInfoComponent !== null) {
      remove(prevInfoComponent);
      this.#infoComponent = null;
      return;
    }
    // const infoData = this.#createInfoData(points);


    if (prevInfoComponent === null) {
      render(this.#infoContaner, this.#infoComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#infoComponent, prevInfoComponent);
    remove(prevInfoComponent);
  }

  #infoModelHendler = () => {
    this.init();
  }


}

