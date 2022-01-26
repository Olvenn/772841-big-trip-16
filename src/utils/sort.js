import dayjs from 'dayjs';
import {timeDifference} from './common';

export const sortByDay = (pointA, pointB) => dayjs(pointA.dateFrom) - dayjs(pointB.dateFrom);

export const sortByPrice = (pointA, pointB) => (pointB.basePrice - pointA.basePrice);

export const sortByDuration = (pointA, pointB) =>timeDifference(pointA.dateFrom, pointA.dateTo) - timeDifference(pointB.dateFrom, pointB.dateTo);
