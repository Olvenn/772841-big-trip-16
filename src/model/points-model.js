import AbstractObservable from '../utils/abstract-observable.js';
import {UpdateType} from '../consts.js';
import dayjs from 'dayjs';

export default class PointsModel extends AbstractObservable {
  #apiService = null;
  #points = [];
  #destination = [];
  #offers = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;

    this.#apiService.destination.then((destination) => {
    //   // console.log(points);
    //   // console.log(destination);
      console.log(destination);


    //   // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
    //   // а ещё на сервере используется snake_case, а у нас camelCase.
    //   // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
    //   // Есть вариант получше - паттерн "Адаптер"
    //       //  console.log(points.map(this.#adaptToClient));
    });
  }

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destination() {
    return this.#destination;
  }

  init = async () => {
    try {
      const points = await this.#apiService.points;
      this.#points = points.map(this.#adaptToClient);
      this.#destination = await this.#apiService.destination;
      this.#offers = await this.#apiService.offers;

    } catch(err) {
      this.#points = [];
      this.#destination = [];
    }

    this._notify(UpdateType.INIT);
  }

  updatePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint = (updateType, update) => {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  #adaptToClient = (point) => {
    const adaptedPoint = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      // dateFrom: dayjs(point['date_from']),
      // dateTo: dayjs(point['date_to']),
      isFavorite: point['is_favorite'],
      typeEvent: point['type'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];
    delete adaptedPoint['type'];

    return adaptedPoint;
  }
}

