import {getRandomInteger, generateDayTimeDate, getArrayFromArray, getElement, humanizeEventData} from './utils.js';
import {offers, EventTypes, NAME_PLACES} from '../consts.js';
const TEMPORARY = {
  idTemp: 10000000000,
  integerPrice1: 100,
  integerPrice2: 5000,
}

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

export const generatePlace = () => ({
  name: NAME_PLACES[getRandomInteger(0, NAME_PLACES.length - 1)],
  description: (generateDescription(descriptionsArray)),
  pictures:  getArrayFromArray(photosName) ? getArrayFromArray(photosName).map((it) => (`<img class="event__photo" src="img/photos/'${it+1}'.jpg" alt="Event photo"></img>`)).join('') : '',
});

export const generateEvent = () => ({
  id: parseInt((Math.random() * TEMPORARY.idTemp), 10),
  eventDate: humanizeEventData()[0],
  dateFrom: generateDayTimeDate()[1],
  dateTo: generateDayTimeDate()[2],
  duration: generateDayTimeDate()[3],
  destination: getElement(NAME_PLACES),
  basePrice: getRandomInteger(TEMPORARY.integerPrice1, TEMPORARY.integerPrice2),
  typeEvent: getElement(EventTypes).name,
  offers:  getArrayFromArray(offers),
  isFavorite: Boolean(getRandomInteger(0, 1)),
});
