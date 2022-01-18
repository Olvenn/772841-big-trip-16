import dayjs from 'dayjs';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const sortByPrice = (pointA, pointB) => (pointB.basePrice - pointA.basePrice);

export const sortByDuration = (pointA, pointB) =>
  dayjs(pointA.dateFrom).diff(dayjs(pointA.dateTo)) - dayjs(pointB.dateFrom).diff(dayjs(pointB.dateTo));
