import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {getRandomInteger} from '../utils/common.js';
dayjs.extend(duration);

export const NAME_PLACES = [
  'Barcelona',
  'Los Angeles',
  'Madrid',
  'Rome',
  'Rio de Janeiro',
];

const addZeroToNumber = (number) => (number < 10) ? `0${number}` : number;


export const firstToUpperCase = (str) => {
  if (!str) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
};

export const nowDay = () => (dayjs());

export const generateEventDates = () => {

  const MAXDAYSGAP = 3;
  const daysGap = getRandomInteger(-MAXDAYSGAP, MAXDAYSGAP - 1);
  const startDate = getRandomInteger(-MAXDAYSGAP, daysGap);
  const finishDate = getRandomInteger(daysGap, MAXDAYSGAP);
  return [dayjs().add(startDate, 'day').toDate(), dayjs().add(finishDate, 'day').toDate(), finishDate - startDate];
};

export const humanizeEventNew = (date) => dayjs(date).format('D/MM/YY hh:mm');
export const humanizeEventData = (date) => dayjs(date).format('MMM D');
export const humanizeEventTime = (date) => dayjs(date).format('hh:mm');
export const humanizeEventDay = (date) => dayjs(date).format('D');

export const humanizeEventDuration = (date) => {
  const days = date.days() > 0 ? `${addZeroToNumber(date.days())} D` : '';
  const hours = date.hours() > 0 ? `${addZeroToNumber(date.hours())} H` : '00H';
  const minutes = date.minutes() > 0 ? `${addZeroToNumber(date.minutes())} M` : '00M';

  const TIME__DURATION = `${days} ${hours} ${minutes}`;

  return TIME__DURATION;
};

export const startFinishDays = () => {
  const MAXDAYSGAP1 = 7;
  const daysGap = getRandomInteger(-MAXDAYSGAP1, MAXDAYSGAP1 - 1);

  const startDate = getRandomInteger(-MAXDAYSGAP1, daysGap);
  const finishDate = getRandomInteger(daysGap, MAXDAYSGAP1);
  return `${humanizeEventData(dayjs().add(startDate, 'day').toDate())}&nbsp;&mdash;&nbsp;${humanizeEventData(dayjs().add(finishDate, 'day').toDate())}`;
};

export const generateDayTimeDate = () => {

  const MAXDAYSGAP2 = 7;
  const daysGap = getRandomInteger(0, MAXDAYSGAP2);
  const DAY_START = dayjs().add(daysGap, 'day').toDate();

  const maxTimeGapStart = 960;
  const timeGapStart = getRandomInteger(0, maxTimeGapStart);
  const TIME_START = dayjs(DAY_START).add(timeGapStart, 'm').toDate();

  const maxTimeGapEnd = 2880;
  const timeGapEnd = getRandomInteger(timeGapStart, maxTimeGapEnd);

  const TIME_END  = dayjs(TIME_START).add(timeGapEnd, 'm').toDate();

  const timeDurationMs = dayjs.duration(TIME_END - TIME_START);

  // const days = timeDurationMs.days() > 0 ? `${addZeroToNumber(timeDurationMs.days())} D` : '';
  // const hours = timeDurationMs.hours() > 0 ? `${addZeroToNumber(timeDurationMs.hours())} H` : '00H';
  // const minutes = timeDurationMs.minutes() > 0 ? `${addZeroToNumber(timeDurationMs.minutes())} M` : '00M';

  // const TIME__DURATION = `${days} ${hours} ${minutes}`;

  return [DAY_START, TIME_START, TIME_END, timeDurationMs];
};


export const getElementsFromArrayOrNull = (arrayAll) => {
  let elements = [];
  if (Math.random() > 0.5) {
    elements = arrayAll.filter(() => Math.random() > 0.5);
  }
  return elements;
};

export const getArrayFromArray = (arrayAll) => {
  const isOffes = Boolean(getRandomInteger(0, 1));
  let elements = [];
  if (!isOffes) {
    return elements;
  }

  if (Math.random() > 0.5) {
    elements = arrayAll.filter(() => Math.random() > 0.3);
  }
  return elements;
};

export const getArrayWithDots = (arrayAll) => {
  const nameCount = getRandomInteger(2, arrayAll.length);
  let elements = [];
  if (nameCount === 2) {
    elements = [arrayAll[0], arrayAll[arrayAll.length - 1]];
  } else if (nameCount === 3 || nameCount === 1) {
    elements = arrayAll;
  }  else {
    elements = [arrayAll[0], '...', arrayAll[arrayAll.length - 1]];
  }
  return elements;
};

export const getElement = (elements) => (elements[getRandomInteger(0, elements.length - 1)]);

export const generateDedlineDate = () => {
  const isDate = Boolean(getRandomInteger(0, 1));

  if (!isDate) {
    return null;
  }

  const MAXDAYSGAP3 = 7;
  const daysGap = getRandomInteger(-MAXDAYSGAP3, MAXDAYSGAP3);

  return dayjs().add(daysGap, 'day').toDate();
};


export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};
