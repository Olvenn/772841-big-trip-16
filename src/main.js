import {createInfoTemplate} from './view/info-view.js';
import {createContolTemplate} from './view/control-view.js';
import {createFilterTemplate} from './view/filter-view.js';
import {createSortTemplate} from './view/sort-view.js';
import {createCoverConternTemplate} from './view/cover-content-view.js';
import {createEventTemplate} from './view/event-view.js';
import {createNewEventTemplate} from './view/new-event-view.js';

import {renderTemplate, RenderPosition} from './render.js';

const tripMainElement = document.querySelector('.trip-main');
const controlElement = document.querySelector('[data-view="control"]');
const filterElement = document.querySelector('[data-view="filter"]');
const sortHeaderElement = document.querySelector('[data-view="main"]');
const mainElement = document.querySelector('.trip-events');

renderTemplate(tripMainElement, createInfoTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(controlElement, createContolTemplate(), RenderPosition.AFTEREND);
renderTemplate(filterElement, createFilterTemplate(), RenderPosition.AFTEREND);
renderTemplate(sortHeaderElement, createSortTemplate(), RenderPosition.AFTEREND);
renderTemplate(mainElement, createCoverConternTemplate(), RenderPosition.BEFOREEND);
const coverElement = document.querySelector('.trip-events__list');

renderTemplate(coverElement, createNewEventTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(coverElement, createEventTemplate(), RenderPosition.BEFOREEND);
