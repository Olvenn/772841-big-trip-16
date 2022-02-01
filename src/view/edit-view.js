import {eventTypes, BLANK_POINT} from '../consts.js';
import {firstToUpperCase} from '../utils/common.js';
import SmartView from './smart-view.js';
import flatpickr from 'flatpickr';
import he from 'he';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createTypeTemplate = (typeName, typesEvent, isDisabled) => (
  `<div class="event__type-item">
                            <input id="event-type-${typesEvent.name}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typesEvent.name}" ${isDisabled ? 'disabled' : ''}>
                            <label class="event__type-label  event__type-label--${typesEvent.name}" for="event-type-${typesEvent.name}-1">${firstToUpperCase(typesEvent.name)} ${typesEvent.name === typeName ? 'checked' : ''}</label>
                          </div>`
);

const createDestinationTemplate = (place) => (
  `<option value="${place}"></option>`
);

const createOfferTemplate = (offer, isDisabled) => (
  `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden"
            id="event-offer-${offer.id}-1" data-id="${offer.id}" type="checkbox" name="event-offer-${offer.id}"
             ${offer.isChecked ? ' checked' : ''} ${isDisabled ? 'disabled' : ''}>
            <label class="event__offer-label" for="event-offer-${offer.id}-1">
              <span class="event__offer-title">${offer.title}</span>

              &plus;&euro;&nbsp;
              <span class="event__offer-${offer.id}">${offer.price}</span>
            </label>
          </div>`
);

const createOffersTemplate = (isDisabled, typeOffersList) => (
  `<section class="event__details">
             <section class="event__section  event__section--offers">
             <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
            ${typeOffersList.map((offer) => createOfferTemplate(offer, isDisabled)).join('\n')}
            </div>
            </section>`
);

const createDescriptionAndPicturesTemplate = (destination) => (
  `<section class="event__section  event__section--destination">
                      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                      <p class="event__destination-description">${destination.description}</p>
                      <div class="event__photos-container">
                        <div class="event__photos-tape">
                          ${destination.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}"></img>`).join('')}
                        </div>
                      </div>
                    </section>`
);

export const createEditTemplate = (point, destinations, offersList) => {

  const {id, offers, typeEvent, basePrice, destination, dateFrom, dateTo,
    isDisabled,
    isSaving,
    isDeleting,} = point;


  const cancelOrDelete = id ? 'Delete' : 'Cancel';

  const allOffersOneType  = offersList.find((offer) => offer.type ===  typeEvent).offers;

  const idCheckedOffers = offers.map((offer) => offer.id);

  allOffersOneType.forEach((offer) => {
    offer.isChecked = (idCheckedOffers.indexOf(offer.id) !== -1);
  });

  const isSubmitDisabled = basePrice <= 0;
  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                    <div class="event__type-wrapper">
                      <label class="event__type  event__type-btn" for="event-type-toggle-1">
                        <span class="visually-hidden">Choose event type</span>
                        <img class="event__type-icon" width="17" height="17" src="img/icons/${typeEvent}.png" alt="${typeEvent} icon">
                      </label>
                      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

                      <div class="event__type-list">
                        <fieldset class="event__type-group">
                          <legend class="visually-hidden">Event type</legend>
                            ${eventTypes.map((type) => createTypeTemplate(eventTypes.typeEvent, type, isDisabled)).join('\n')}
                        </fieldset>
                      </div>
                    </div>

                    <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${typeEvent}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination ? he.encode(destination.name) : ''}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}  autocomplete="false" >
                    <datalist id="destination-list-1">

                      ${Object.values(destinations.map((oneDestination) => oneDestination.name)).map((name) => createDestinationTemplate(name)).join('\n')}

                    </datalist>
                  </div>

                    <div class="event__field-group  event__field-group--time">
                      <label class="visually-hidden" for="event-start-time-1">From</label>
                      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom}" ${isDisabled ? 'disabled' : ''}>

                      &mdash;
                      <label class="visually-hidden" for="event-end-time-1">To</label>
                      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo}" ${isDisabled ? 'disabled' : ''}>
                    </div>

                    <div class="event__field-group  event__field-group--price">
                      <label class="event__label" for="event-price-1">
                        <span class="visually-hidden">Price</span>
                        &euro;
                      </label>
                      <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
                    </div>

                    <button class="event__save-btn  btn  btn--blue" type="submit"
                     ${isSubmitDisabled || isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
                    <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : cancelOrDelete}</button>
                    <button class="event__rollup-btn" type="button">
                      <span class="visually-hidden">Open event</span>
                    </button>
                  </header>

                  ${allOffersOneType.length > 0 ? createOffersTemplate(isDisabled, allOffersOneType) : ''}

                  ${destination ? createDescriptionAndPicturesTemplate(destination) : ''}

                    </section>
                  </section>
                </form>
            </li>`;
};

export default class EditView extends SmartView {
  #dateFromPicker = null;
  #dateToPicker = null;
  #destinationsAll = null;
  #offersAll = null;
  #point = null;

  constructor(point = BLANK_POINT, destinationsAll, offersAll) {
    super();

    this._data = EditView.parsePointToData(point);
    this.#destinationsAll = destinationsAll;
    this.#offersAll = offersAll;
    this.#point = point;

    this.#setInnerHandlers();
    this.#setDatepicker();
    this.setDeleteClickHandler(this._callback.deleteClick);

  }

  get template() {
    return createEditTemplate(this._data, this.#destinationsAll, this.#offersAll);
  }

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  }

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(EditView.parseDataToPoint(this._data));
  }

  #setDatepicker = () => {
    this.#dateFromPicker = flatpickr (
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        maxDate: this._data.dateTo,
        defaultDate: this._data.dateFrom,
        onChange: this.#dateFromChangeHandler,
      },
    );

    this.#dateToPicker = flatpickr (
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        minDate: this._data.dateFrom,
        defaultDate: this._data.dateTo,

        onChange: this.#dateToChangeHandler,
      },
    );
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onTypeChange);
    this.element.querySelector('.event__field-group--destination').addEventListener('input', this.#onCityChange);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#onPriceInput);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#onPriceInput);
    this.element.querySelectorAll('.event__offer-checkbox').forEach((element) => element.addEventListener('change', this.#offerChangeHandler));
    this.#setDatepicker();
  }

  removeElement = () => {
    super.removeElement();

    if (this.#dateFromPicker) {
      this.#dateFromPicker.destroy();
      this.#dateFromPicker = null;
    }

    if (this.#dateToPicker) {
      this.#dateToPicker.destroy();
      this.#dateToPicker = null;
    }
  }

  #dateFromChangeHandler = ([userDate]) => {
    this.updateData({
      dateFrom: userDate,
    });
  }

  #dateToChangeHandler = ([userDate]) => {

    this.updateData({
      dateTo: userDate,
    });
  }

  #onTypeChange = (evt) => {
    evt.preventDefault();
    this.updateData({
      typeEvent: evt.target.value,
      offers: this.#offersAll.find((offer) => offer.type === evt.target.value).offers,
    });
  };

  #onCityChange = (evt) => {
    evt.preventDefault();

    const destinationNew = this.#destinationsAll.find((destination) => destination.name === evt.target.value);

    if (destinationNew) {

      this.updateData({
        destination: destinationNew,
      });

    } else {
      const saveButtonElement = this.element.querySelector('.event__save-btn');
      const cityInputElement = this.element.querySelector('.event__input--destination');
      cityInputElement.style.color = 'rgb(178, 35, 35)';
      cityInputElement.setCustomValidity('Please, change destination from list.');
      cityInputElement.reportValidity();
      saveButtonElement.disabled = true;
    }
  };

  #onPriceInput = (evt) => {
    evt.preventDefault();
    if(parseInt(evt.target.value, 10) > 0 || parseInt(evt.target.value, 10) === '') {
      this.updateData({
        basePrice: parseInt(evt.target.value, 10)
      });
    } else {
      const saveButtonElement = this.element.querySelector('.event__save-btn');
      const cityInputElement = this.element.querySelector('.event__input--price');
      cityInputElement.style.color = 'rgb(178, 35, 35)';
      cityInputElement.setCustomValidity('Enter an amount greater than 0.');
      cityInputElement.reportValidity();
      saveButtonElement.disabled = true;
    }
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();

    const typeOffer = this.#point.typeEvent;

    const offersAll =  this.#offersAll;

    const offersList  = offersAll.find((offer) => offer.type ===  typeOffer).offers;

    let offerItemsChecked =  this.#point.offers;

    const offersElements = document.querySelectorAll('.event__offer-checkbox:checked');

    const idCheckedItemsFormAllOffers = [...offersElements].map((element) => +Object.values(element.dataset));

    offersList.map((offer) => {
      if (idCheckedItemsFormAllOffers.indexOf(offer.id) !== -1) {
        offer.isChecked = true;
      } else {
        offer.isChecked = false;
      }
    }, true);

    offerItemsChecked = offersList.filter((offer) => offer.isChecked);

    this.updateData({
      offers: offerItemsChecked,
    });
  }

  reset = (point) => {
    this.updateData(
      EditView.parsePointToData(point),
    );
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setCloseFormHandler(this._callback.closeEdit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  setCloseFormHandler = (callback) => {
    this._callback.closeEdit = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeFormHandler);
  }

  #closeFormHandler = (evt) => {
    evt.preventDefault();

    this._callback.closeEdit(this._data);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditView.parseDataToPoint(this._data));
  }


  static parsePointToData = (point) => ({
    ...point,
    isSaving: false,
    isDisabled: false,
    isDeleting: false,
  })

  static parseDataToPoint = (data) => {

    const point = {...data};

    delete point.isSaving;
    delete point.isDisabled;
    delete point.isDeleting;

    return point;
  }
}
