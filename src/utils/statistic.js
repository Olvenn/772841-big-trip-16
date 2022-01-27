import dayjs from 'dayjs';

export const createDataForStatistic = (allPoints, statisticType) => {
  const getTypesListWithZero = (points) => {
    const list = new Map();
    points.map((event) => list.set(event.typeEvent, 0));
    return list;
  };
  const dataForMoneyEmpty = Object.fromEntries(getTypesListWithZero(allPoints));

  const typeStatistic = statisticType;

  const dataForMoneyNotSorted = allPoints.reduce((res, it) => {
    const typeEvent = it.typeEvent;

    let dataPlus = 1;

    if (typeStatistic === 'price') {
      dataPlus = it.basePrice;
    } else if (typeStatistic === 'time') {
      dataPlus = dayjs(it.dateTo).diff(dayjs(it.dateFrom), 'minutes');
    }

    res[typeEvent] += dataPlus;

    return res;

  }, dataForMoneyEmpty);

  const dataForMoneySorted = Object.entries(dataForMoneyNotSorted)
    .sort(([ , type1],[ , type2]) => type1 - type2)
    .reduce((res, [type, money]) => ({ ...res, [type]: money }), {});
  return dataForMoneySorted;
};

