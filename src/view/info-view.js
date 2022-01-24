import AbstractView from './abstract-view.js';
import {getArrayWithDots, sortByDay} from '../utils/common.js';
import dayjs from 'dayjs';


const createInfoTemplate = (citys, dates, price) => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${citys()}</h1>

      <p class="trip-info__dates">${dates()}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${price()}</span>
    </p>
  </section>`
);


export default class InfoView extends AbstractView {
  #points = [];

  constructor(points) {
    super();
    this.#points = points.sort(sortByDay);
  }

  get template() {

    return createInfoTemplate(this.#cityNames, this.#StartEndDates, this.#totalPrice);
  }


  #StartEndDates = () => {
    const points = this.#points;

    const startDate = dayjs(points[0].dateFrom).format('MMM D');
    const finishDate =  dayjs(points[points.length - 1].dateFrom).format('MMM D');

    return `${startDate}&nbsp;&mdash;&nbsp${finishDate}`;
  }

  #totalPrice = () => {
    const points = this.#points;

    const totalOffersPrice = points.map((point) => point.offers.map((offer) => offer.price)).reduce((res, it) =>  res.concat(it), []).reduce((sum, price) => sum + price, 0);

    const totalDestinationPrice = points.reduce((sum, point) => sum + point.basePrice, 0);
    const totalPrice= totalOffersPrice + totalDestinationPrice;


    return totalPrice;
  }

    #cityNames = () => {

      const pointsDestinationName = this.#points.map((it) => it.destination.name);

      const pointsLength = this.#points.length;

      const name = pointsLength > 0 ? getArrayWithDots(pointsDestinationName) : '';
      return name;
    }
}
