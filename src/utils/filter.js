import {FilterType} from '../consts.js';
import dayjs from 'dayjs';

const isFuturePoints = (point) => dayjs(point.dateFrom) >= dayjs();
const isPastPoints = (point) => dayjs(point.dateTo) < dayjs();
const isFuturePastPoints = (point) => dayjs(point.dateFrom) < dayjs()  && dayjs(point.dateTo) > dayjs();

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => (isFuturePoints(point) || (isFuturePastPoints(point)))),
  [FilterType.PAST]: (points) => points.filter((point) => (isPastPoints(point) || (isFuturePastPoints(point)))),
};
