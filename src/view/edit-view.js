import {EventTypes, NAME_PLACES} from '../consts.js';
import {firstToUpperCase, humanizeEventTime} from '../moki/utils.js';
import {generateDescription, descriptionsArray} from '../moki/moki.js';
import AbstractView from './abstract-view.js';

const createTypeTemplate = (typeName, typesEvent) => (
  `<div class="event__type-item">
                            <input id="event-type-${typesEvent.name}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typesEvent.name}">
                            <label class="event__type-label  event__type-label--${typesEvent.name}" for="event-type-${typesEvent.name}-1">${firstToUpperCase(typesEvent.name)} ${typesEvent.name === typeName ? 'checked' : ''}</label>
                          </div>`
);

const createDestinationTemplate = (place) => (
  `<option value="${place}"></option>
  >`
);

const createOfferTemplate = (offer) => {
  const {name, description, price, isChecked, isDisabled} = offer;
  return `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden"
            id="event-offer-${name}-1" type="checkbox" name="event-offer-${name}"
            ${isChecked ? 'checked' : ''}
            ${isDisabled ? 'disabled' : ''}>
            <label class="event__offer-label" for="event-offer-${name}-1">
              <span class="event__offer-title">${description}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-${name}">${price}</span>
            </label>
          </div>`;
};

export const createEditTemplate = (event) => {
  const {offers, typeEvent, destination, basePrice, dateFrom, dateTo} = event;

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                    <div class="event__type-wrapper">
                      <label class="event__type  event__type-btn" for="event-type-toggle-1">
                        <span class="visually-hidden">Choose event type</span>
                        <img class="event__type-icon" width="17" height="17" src="img/icons/${typeEvent}.png" alt="${typeEvent} icon">
                      </label>
                      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                      <div class="event__type-list">
                        <fieldset class="event__type-group">
                          <legend class="visually-hidden">Event type</legend>
                            ${EventTypes.map((it) => createTypeTemplate(EventTypes.typeEvent, it)).join('\n')}
                        </fieldset>
                      </div>
                    </div>

                    <div class="event__field-group  event__field-group--destination">
                      <label class="event__label  event__type-output" for="event-destination-1">
                        ${firstToUpperCase(typeEvent)}
                      </label>
                      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=" ${destination}" list="destination-list-1">
                      <datalist id="destination-list-1">
                                     fjeq[g qghrgwkg]
                        ${NAME_PLACES.map((it) => createDestinationTemplate(it)).join('\n')}
                      </datalist>
                    </div>

                    <div class="event__field-group  event__field-group--time">
                      <label class="visually-hidden" for="event-start-time-1">From</label>
                      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeEventTime(dateFrom)}">
                      &mdash;
                      <label class="visually-hidden" for="event-end-time-1">To</label>
                      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeEventTime(dateTo)}">
                    </div>

                    <div class="event__field-group  event__field-group--price">
                      <label class="event__label" for="event-price-1">
                        <span class="visually-hidden">Price</span>
                        &euro;
                      </label>
                      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
                    </div>


                    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                    <button class="event__reset-btn" type="reset">Delete</button>
                    <button class="event__rollup-btn" type="button">
                      <span class="visually-hidden">Open event</span>
                    </button>
                  </header>
                  <section class="event__details">
                    <section class="event__section  event__section--offers">
                      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                      <div class="event__available-offers">


                      ${offers.map((it) => createOfferTemplate(it)).join('\n')}

                      </div>
                    </section>

                    <section class="event__section  event__section--destination">
                      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                      <p class="event__destination-description">${generateDescription(descriptionsArray)}</p>
                    </section>
                  </section>
                </form>
            </li>`;
};

export default class EditView extends AbstractView {
  #element = null;
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createEditTemplate(this.#point);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(this.#point);
  }
}
