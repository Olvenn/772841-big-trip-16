import dayjs from 'dayjs';

export const firstToUpperCase = (str) => {
  if (!str) {
    return;
  }
  return str[0].toUpperCase() + str.slice(1);
};

export const humanizeEventData = (date) => dayjs(date).format('MMM D');

export const humanizeEventTime = (date) => dayjs(date).format('hh:mm');

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const timeDifference = (timeStart, timeEnd) => dayjs(timeStart).diff(dayjs(timeEnd));

const addZeroToNumber = (number) => (number < 10) ? `0${number}` : number;

export const getTimeFormatted = (timeDuration) => {
  const minutesDifference = timeDuration % 60 > 0 ? `${addZeroToNumber(timeDuration % 60)}M` : ' 00M';
  const hoursDifference = Math.floor(timeDuration / 60) % 24 > 0 ? `${addZeroToNumber(Math.floor(timeDuration / 60) % 24)}H ` : '00M ';
  const daysDifference = Math.floor((timeDuration / 60) / 24) > 0 ? `${addZeroToNumber(Math.floor((timeDuration / 60) / 24))}D ` : '';
  return daysDifference + hoursDifference + minutesDifference;
};

export const getTimeDifference = (timeStart, timeEnd) => {
  const timeDuration = timeEnd.diff(timeStart, 'minutes');
  return getTimeFormatted(timeDuration);
};

export const getArrayWithDots = (points, pointsLength) => {
  let elements = '';
  if (pointsLength  < 4) {
    elements = points.join(' - ');
  }  else {
    elements = `${points[0]} ... ${points[points.length - 1]}`;
  }
  return elements;
};
