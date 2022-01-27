import {FilterType} from '../consts.js';
import dayjs from 'dayjs';

const DAY_START = dayjs();

const isFuturePoints = (point) => DAY_START.isBefore(point.dateFrom);
const isPastPoints = (point) => DAY_START.isAfter(point.dateTo);

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.PAST]: (points) => points.filter((point) => isPastPoints(point)),
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuturePoints(point)),
};
