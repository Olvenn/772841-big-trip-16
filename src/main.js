import {createInfoTemplate} from './view/info-view.js';
import {createContolTemplate} from './view/control-view.js';
import {createFilterTemplate} from './view/filter-view.js';
import {createSortTemplate} from './view/sort-view.js';
import {createCoverConternTemplate} from './view/cover-content-view.js';
import {createEventTemplate} from './view/event-view.js';
import {createNewEventTemplate} from './view/new-event-view.js';


import {renderTemplate, RenderPosition} from './render.js';
console.log('start');

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
console.log(coverElement);
renderTemplate(coverElement, createNewEventTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(coverElement, createEventTemplate(), RenderPosition.BEFOREEND);

console.log(coverElement);


// import {renderTemplate, RenderPosition} from './render.js';
// import {createSortTemplate} from './view/sort-view.js';
// import {createEventTemplate} from './view/event-view';
// import {createMenuTemplate} from './view/menu-view';
// import {createFilterTemplate} from './view/filter-view';
// import {createLoadingTemplate} from './view/loading-view';
// import {createEditTemplate} from './view/edit-view';
// console.log("starts");

// console.log("starts");
// const contentElement = document.querySelector('.trip-events');
// const sortHeaderElement = document.querySelector('[data-container="sort"]');
// const menuElement = document.querySelector('[data-container="menu"]');
// const filterElement = document.querySelector('[data-container="filter"]');
// const loadingElement = document.querySelector('[data-container="loading"]');
// const editElement = document.querySelector('.event--edit');

// console.log(createEventTemplate());
// renderTemplate(sortHeaderElement, createSortTemplate(), RenderPosition.AFTEREND);
// renderTemplate(contentElement, createEventTemplate(), RenderPosition.BEFOREEND);
// renderTemplate(menuElement, createMenuTemplate(), RenderPosition.AFTEREND);
// renderTemplate(filterElement, createFilterTemplate(), RenderPosition.AFTEREND);
// renderTemplate(loadingElement, createLoadingTemplate(), RenderPosition.AFTEREND);
// renderTemplate(editElement, createEditTemplate(), RenderPosition.AFTERBEGIN);
