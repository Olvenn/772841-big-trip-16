import {EventTypes, BLANK_POINT} from '../consts.js';
import {firstToUpperCase, humanizeEventTime} from '../moki/utils.js';
import SmartView from './smart-view.js';
import flatpickr from 'flatpickr';
// import he from 'he';
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

export const createEditTemplate = (point, destinations, offersList) => {

 const {offers, typeEvent, basePrice, destination, dateFrom, dateTo,
    isDisabled,
    isSaving,
    isDeleting,} = point;

  const getDestination = destination.description !== '' ? destination : destinations.find((it) => it.name === destination.name);

  const idCheckedItems = offers.map((it) => it.id);
  const typeOffersList  = offersList.find((it) => it.type ===  typeEvent).offers;


// console.log('typeOffersList', typeOffersList);
// console.log(idCheckedItems);
  typeOffersList.forEach((it) => {
    if (idCheckedItems.indexOf(it.id) !== -1) {
      it.isChecked = true;
      // console.log(it);
    } else {
      it.isChecked = false;
    }
  });
// console.log('after', typeOffersList);

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
                            ${EventTypes.map((it) => createTypeTemplate(EventTypes.typeEvent, it)).join('\n')}
                        </fieldset>
                      </div>
                    </div>

                    <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${firstToUpperCase(typeEvent)}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${Object.values(destinations.map((el) => el.name)).map((it) => createDestinationTemplate(it)).join('\n')}

                    </datalist>
                  </div>

                    <div class="event__field-group  event__field-group--time">
                      <label class="visually-hidden" for="event-start-time-1">From</label>
                      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeEventTime(dateFrom)}" ${isDisabled ? 'disabled' : ''}>
                      &mdash;
                      <label class="visually-hidden" for="event-end-time-1">To</label>
                      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeEventTime(dateTo)}" ${isDisabled ? 'disabled' : ''}>
                    </div>

                    <div class="event__field-group  event__field-group--price">
                      <label class="event__label" for="event-price-1">
                        <span class="visually-hidden">Price</span>
                        &euro;
                      </label>
                      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
                    </div>

                    <button class="event__save-btn  btn  btn--blue" type="submit"
                     ${isDisabled ? 'disabled' : ''}
                    >${isSaving ? 'Saving...' : 'Save'}</button>
                    <button class="event__reset-btn" type="reset" ${isDeleting ? 'Deleting...' : 'Delete'}
                    >Delete</button>
                    <button class="event__rollup-btn" type="button">
                      <span class="visually-hidden">Open event</span>
                    </button>
                  </header>
                  <section class="event__details">
                    <section class="event__section  event__section--offers">
                      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                      <div class="event__available-offers">

                    ${typeOffersList.length > 0 ? typeOffersList.map((it) => createOfferTemplate(it)).join('\n') : ''}

                      </div>
                    </section>

                    <section class="event__section  event__section--destination">
                      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                      <p class="event__destination-description">${getDestination.description}</p>
                      <div class="event__photos-container">
                      <div class="event__photos-tape">
                                          ${getDestination.pictures.map((el) => `<img class="event__photo" src="${el.src}" alt="${el.description}"></img>`).join()}
                      </div>

                    </div>
                  </section>
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
    this.#setDatepicker();

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
    this.element.querySelector('.event__input--price').addEventListener('input', this.#onPriceInput);
    this.element.querySelectorAll('.event__offer-checkbox').forEach((element) => element.addEventListener('change', this.#offerChangeHandler));
    this.#setDatepicker();

  }

  #onTypeChange = (evt) => {
    evt.preventDefault();
    this.updateData({
      typeEvent: evt.target.value,
      offers: this.#offersAll.find((it) => it.type === evt.target.value).offers,
    });
  };

  #onCityChange = (evt) => {
    evt.preventDefault();

    const destinationNew = this.#destinationsAll.find((it) => it.name === evt.target.value);

    this.updateData({
      destination: destinationNew,
    });
  };

  #onPriceInput = (evt) => {
    evt.preventDefault();
    this.updateData({
      basePrice: parseInt(evt.target.value, 10)
    });
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();

    const idOffer = +evt.target.dataset.id;
    const nameOffer = this.#point.typeEvent;
    console.log(nameOffer);

    console.log(this.#point);
    console.log(idOffer);

    // Массив выбранных offers
    const offerItemsChecked =  this.#point.offers;
    console.log("old", offerItemsChecked);

    // Массив всех  offers
    // const offersAll =  this.#offersAll;
    // Массив всех offers данного point
    // const typeOffersList  = offersAll.find((it) => it.type ===  nameOffer).offers;
    const newOfferItemsChecked = offerItemsChecked;
    offerItemsChecked.forEach((it) => {
      if (+it.id !== idOffer) {
        newOfferItemsChecked.push(it);
        // console.log('adfe', it);
      }
    });



    console.log("new", newOfferItemsChecked);


    this.updateData({
      offers: newOfferItemsChecked,
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


  static parsePointToData = (point) => ({
    ...point,
    isSaving: false,
    isDisabled: false,
    isDeleting: false,
  })

  static parseDataToPoint = (data) => {
    delete data.isSaving;
    delete data.isDisabled;
    delete data.isDeleting;

    return {...data};
  }

}

