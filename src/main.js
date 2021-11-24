import {renderTemplate, RenderPosition} from './render.js';
import {createSortTemplate} from './view/sort-view.js';
import {createEventTemplate} from './view/event-view';
import {createMenuTemplate} from './view/menu-view';
import {createFilterTemplate} from './view/filter-view';
import {createLoadingTemplate} from './view/loading-view';
import {createEditTemplate} from './view/edit-view';
console.log("starts");

console.log("starts");
const contentElement = document.querySelector('.trip-events');
const sortHeaderElement = document.querySelector('[data-container="sort"]');
const menuElement = document.querySelector('[data-container="menu"]');
const filterElement = document.querySelector('[data-container="filter"]');
const loadingElement = document.querySelector('[data-container="loading"]');
const editElement = document.querySelector('.event--edit');

console.log(createEventTemplate());
renderTemplate(sortHeaderElement, createSortTemplate(), RenderPosition.AFTEREND);
renderTemplate(contentElement, createEventTemplate(), RenderPosition.BEFOREEND);
renderTemplate(menuElement, createMenuTemplate(), RenderPosition.AFTEREND);
renderTemplate(filterElement, createFilterTemplate(), RenderPosition.AFTEREND);
// renderTemplate(loadingElement, createLoadingTemplate(), RenderPosition.AFTEREND);
// renderTemplate(editElement, createEditTemplate(), RenderPosition.AFTERBEGIN);

