import {generateDayTimeDate, getArrayFromArray, getElement, humanizeEventData} from './utils.js';
import {offers, EventTypes, NAME_PLACES, EventTypesOffers} from '../consts.js';
import {getRandomInteger} from '../utils/common.js';
import {nanoid} from 'nanoid';
import dayjs from 'dayjs';

const TEMPORARY = {
  integerPrice1: 100,
  integerPrice2: 5000,
};

export const descriptionsArray = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'.split('.');

const SENTENCESNUMBER = 5;

export const generateDescription = (descriptions) => {
  const getSentencesNumber = getRandomInteger(1, SENTENCESNUMBER);
  let description = '';
  for (let i = 0; i < getSentencesNumber; i++) {
    description += `${descriptions[i]}. `;
  }
  return description.substring(0, description.length - 1);
};

const countPhotos = 5;
const photosName = Array.from(Array(countPhotos).keys());

const photos = [{src: 'img/photos/1.jpg', description: 'Event photo 1'},
  {src: 'img/photos/2.jpg', description: 'Event photo 2'},
  {src: 'img/photos/3.jpg', description: 'Event photo 3'},
  {src: 'img/photos/4.jpg', description: 'Event photo 4'},
  {src: 'img/photos/5.jpg', description: 'Event photo 5'},
];


export const generatePlace = () => ({
  name: NAME_PLACES[getRandomInteger(0, NAME_PLACES.length - 1)],
  description: (generateDescription(descriptionsArray)),
  pictures: photos.slice(0, (Math.random() * (5 - 2) + 2)).map((el) => `<img class="event__photo" src="${el.src}" alt="${el.description}"></img>`).join()

});


const MAX_MINUTES_GAP = 2880;

const getDate = () => dayjs().add(getRandomInteger(-MAX_MINUTES_GAP, MAX_MINUTES_GAP), 'minute');


export const generateEvent = () => {
  const firstDate = getDate();
  const secondDate = getDate();
  const eventType = getElement(EventTypes).name;
  const offersOne = EventTypesOffers.filter((el) => el.type === eventType)[0].offers;
  return {
    id: nanoid(),
    eventDate: humanizeEventData()[0],
    dateFrom: dayjs(Math.min(firstDate, secondDate)).toDate(),
    dateTo: dayjs(Math.max(firstDate, secondDate)).toDate(),
    // duration: generateDayTimeDate()[3],
    destination: getElement(Object.values(NAME_PLACES.map((el) => el.name))),
    description: '',
    photos: '',
    basePrice: getRandomInteger(TEMPORARY.integerPrice1, TEMPORARY.integerPrice2),
    // basePrice: 0,
    typeEvent: eventType,
    offers: offersOne,
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
