import InfoView from '../view/info-view.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';

export default class InfoPresenter {
  #nfoContainer = null;
  #pointsModel = null;
  #infoComponent = null;

  constructor(nfoContainer, pointsModel) {
    this.#nfoContainer = nfoContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#infoModelHendler);
  }

  init = () => {
    const points = this.#pointsModel.points;
    const prevInfoComponent = this.#infoComponent;

    if (points.length === 0) {
      if (this.#infoComponent) {
        remove(this.#infoComponent);
        this.#infoComponent = null;
      }
      return;
    }
    const infoData = this.#createInfoData(points);
    this.#infoComponent = new InfoView(infoData);

    if (prevInfoComponent === null) {
      render(this.#nfoContainer, this.#infoComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#infoComponent, prevInfoComponent);
    remove(prevInfoComponent);
  }

  #infoModelHendler = () => {
    this.init();
  }

  #createInfoData = (points) => {

    let totalPrice = 20000;

    let allCheckedOffers = [];

    points.forEach((point) => {
      totalPrice += point.basePrice;
      const allOffersCheckedInPoint = point.offers.filter((offer) => !offer.isChecked);

      allCheckedOffers = [...allCheckedOffers, ...allOffersCheckedInPoint];

      const totalOffersPrice = allCheckedOffers.reduce((res, offer) => res + offer.price, 0);

      totalPrice += totalOffersPrice;


    });

    return {
      totalPrice,
    };
  };
}

