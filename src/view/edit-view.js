
import {EventTypes, NAME_PLACES, offersNames, EventTypesOffers} from '../consts.js';
import {firstToUpperCase, humanizeEventTime, getOffersArray} from '../moki/utils.js';
import {generateDescription, descriptionsArray, generatePlace} from '../moki/moki.js';
import AbstractView from './abstract-view.js';
import SmartView from './smart-view.js';
import {nanoid} from 'nanoid';
import flatpickr from 'flatpickr';
import he from 'he';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = () => {

  const eventType = 'flight';
  return {

    id: nanoid(),
    eventDate:  new Date(),
    dateFrom: new Date(),
    dateTo: new Date(),
    duration: '',
    destination: 'Geneva',
    basePrice: '',
    typeEvent: 'flight',
    offers: EventTypesOffers.filter((el) => el.type === eventType)[0].offers,
    isFavorite: false,
  };
};


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

const createOfferTemplate = (offer, typeEvent, namesOffers) => {

  let offerName =  namesOffers.filter((it)  => it.description === offer.title);

  if (offerName.length === 0) {
    offerName = 'luggage';
  } else {
    offerName = offerName[0].name;
  }

  return `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden"
            id="event-offer-${offerName}-1" data-id="${offer.id}" type="checkbox" name="event-offer-${offerName}"
             ${offer.isChecked ? ' checked' : ''}
            }>
            <label class="event__offer-label" for="event-offer-${offerName}-1">
              <span class="event__offer-title">${offer.title}</span>

              &plus;&euro;&nbsp;
              <span class="event__offer-${offerName}">${offer.price}</span>
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
                      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destination)}" list="destination-list-1">
                      <datalist id="destination-list-1">
                        ${Object.values(NAME_PLACES.map((el) => el.name)).map((it) => createDestinationTemplate(it)).join('\n')}
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

                    ${offers.length > 0 ? offers.map((it) => createOfferTemplate(it, typeEvent, offersNames)).join('\n') : ''}

                      </div>
                    </section>

                    <section class="event__section  event__section--destination">
                      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                      <p class="event__destination-description">${generatePlace().description}</p>
                      <div class="event__photos-container">
                      <div class="event__photos-tape">
                      >${generatePlace().pictures}
                      </div>
                    </div>
                  </section>
                    </section>
                  </section>
                </form>
            </li>`;
};

export default class EditView extends SmartView {

  #element = null;
  #dateFromPicker = null;
  #dateToPicker = null;

  constructor(point = BLANK_POINT(EventTypesOffers)) {
    super();
    // this.#point = point;
    this._data = EditView.parsePointToData(point);

    this.#setInnerHandlers();
    this.#setDatepicker();
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  get template() {
    return createEditTemplate(this._data);
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
        defaultDate: this._data.dateFrom,
        onChange: this.#dateFromChangeHandler,
      },
    );
    this.#dateToPicker = flatpickr (
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.dateTo,
        onChange: this.#dateToChangeHandler,
      },
    );
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

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onTypeChange);
    this.element.querySelector('.event__field-group--destination').addEventListener('change', this.#onCityChange);
    // this.element.querySelector('.event__input--destination').addEventListener('input', this.#onCityInput);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#onPriceInput);
    // this.element.querySelector('.event__offer-checkbox').addEventListener('change', this.#offerChangeHandler);
  }

  #onTypeChange = (evt) => {
    evt.preventDefault();
    this.updateData({
      typeEvent: evt.target.value,
      offers: EventTypesOffers.filter((el) => el.type === evt.target.value)[0].offers,
    });
  };

  #onCityChange = (evt) => {
    evt.preventDefault();
    this.updateData({
      destination: evt.target.value,
      description: generatePlace().description,
      pictures: generatePlace().pictures,
    });
  };

  #onPriceInput = (evt) => {
    evt.preventDefault();
    this.updateData({
      basePrice: parseInt(evt.target.value, 10)
    });
  };

  // #onCityInput = (evt) => {
  //   evt.preventDefault();
  //   this.updateData({
  //     destination: evt.target.value,
  //   });
  // };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    const allOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox'));
    const checkedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));

    // let oldOffers =  this._data.offers;
    // // oldOffers[1].isChecked = true;
    // checkedOffers.forEach((it) => {


    // })



    // const newOllers = oldOffers.pop();



//     const idOffers = checkedOffers.map((it) => Object.values(it.dataset));

//     oldOffers.forEach((it) => {
//       if (idOffers.indexOf(it.id)){
//         // it.isChecked = !(it.isChecked);

//         // it.isChecked = true;
//       }

//     });



      //  console.log(Object.values(idOffers));

    // checkedOffers.forEach((offer) => {


    // })
    // oldOffers.forEach((offer) => {


    // })

    // this.updateData({
    //   offers: newOllers,
    // });
  };


  reset = (point) => {
    this.updateData(
      EditView.parsePointToData(point),
    );
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  setCloseFormHandler = (callback) => {
    this._callback.closeEdit = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeFormHandler);
  }

  #closeFormHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeEdit();
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
  }


  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditView.parseDataToPoint(this._data));
  }

  static parsePointToData = (point) => ({...point});

  static parseDataToPoint = (data) => ({...data});

}

