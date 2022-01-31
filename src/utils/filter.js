import {FilterType} from '../consts.js';
import dayjs from 'dayjs';

const DAY_START_FUTURE = dayjs().subtract(1, 'day');
const isFuturePoints = (point) => DAY_START_FUTURE.isBefore(point.dateFrom);
const isPastPoints = (point) => (dayjs() > dayjs(point.dateTo));

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.PAST]: (points) => points.filter((point) => isPastPoints(point) || !isFuturePoints(point) && !isPastPoints(point)),
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuturePoints(point) || !isFuturePoints(point) && !isPastPoints(point)),
};
