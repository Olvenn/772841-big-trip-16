import {offers, EventTypes, NAME_PLACES, NAME_PHOTOS} from '../consts.js';
import {firstToUpperCase, getRandomInteger, humanizeEventNew} from '../moki/utils.js';
import {generateDescription, descriptionsArray} from '../moki/moki.js';


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

const createPhotosTemplate = (photo) => (
  `<img class="event__photo" src="img/photos/${photo}" alt="Event photo"></img>`
);

const createOfferTemplate = (offer) => {
  const {name, description, price} = offer;
  const isChecked = Boolean(getRandomInteger(0, 1));
  const isDisabled = Boolean(getRandomInteger(0, 1));
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

const BLANK_EVENT = {
  date:  new Date(),
  duration: null,
  typeEvent: 'flight',
};


export const createNewEventTemplate = () => {

  const {date, typeEvent} = BLANK_EVENT;

  return `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${typeEvent}.png" alt="Event type icon">
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
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">
        <datalist id="destination-list-1">
            ${NAME_PLACES.map((it) => createDestinationTemplate(it)).join('\n')}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeEventNew(date)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeEventNew(date)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
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

      <div class="event__photos-container">
        <div class="event__photos-tape">

        ${NAME_PHOTOS.map((it) => createPhotosTemplate(it)).join('\n')}

        </div>
      </div>
    </section>
  </section>
  </form>`;
};
