import {EVENT_COUNT, SortType} from './consts.js';
import {generateEvent} from './moki/moki.js';
import {createInfoTemplate} from './view/info-view.js';
import {createContolTemplate} from './view/control-view.js';
import {createFiltersTemplate} from './view/filter-view.js';
import {createSortTemplate} from './view/sort-view.js';
import {createCoverConternTemplate} from './view/cover-content-view.js';
import {createEventTemplate} from './view/event-view.js';
import {createEditTemplate} from './view/edit-view';

import {renderTemplate, RenderPosition} from './render.js';

const tripMainElement = document.querySelector('.trip-main');
const controlElement = document.querySelector('[data-view="control"]');
const filterElement = document.querySelector('[data-view="filter"]');
const sortHeaderElement = document.querySelector('[data-view="main"]');
const mainElement = document.querySelector('.trip-events');

const events = Array.from({length: EVENT_COUNT}, generateEvent);
generateEvent();

renderTemplate(tripMainElement, createInfoTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(controlElement, createContolTemplate(), RenderPosition.AFTEREND);
renderTemplate(filterElement, createFiltersTemplate(), RenderPosition.AFTEREND);
renderTemplate(sortHeaderElement, createSortTemplate(SortType), RenderPosition.AFTEREND);
renderTemplate(mainElement, createCoverConternTemplate(), RenderPosition.BEFOREEND);
const coverElement = document.querySelector('.trip-events__list');

const renderCard = () => (renderTemplate(coverElement, createEditTemplate(events[0]), RenderPosition.AFTERBEGIN));

const renderEvent = () => (renderTemplate(coverElement, createEventTemplate(events[0]), RenderPosition.AFTERBEGIN));

for (let i = 1; i < EVENT_COUNT; i++) {
  renderTemplate(coverElement, createEventTemplate(events[i]), RenderPosition.BEFOREEND);
}

renderEvent();
const replaceCardToForm = () => {
  renderCard();
};
const replaceFormToCard = () => {
  renderEvent();
};

coverElement.addEventListener('click', (evt) => {

  if(evt.target === document.querySelector('.event__rollup-btn')) {
    replaceCardToForm();
  } else if (evt.target === document.querySelector('.event__save-btn')) {
    coverElement.innerHTML = '';
    replaceFormToCard();
    for (let i = 1; i < EVENT_COUNT; i++) {
      renderTemplate(coverElement, createEventTemplate(events[i]), RenderPosition.BEFOREEND);
    }
  }
});
