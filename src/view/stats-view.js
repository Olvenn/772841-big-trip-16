import {ColorStatistic} from '../consts.js';

import SmartView from './smart-view.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {createDataForStatistic} from '../utils/statistic';
import {getTimeFormatted} from '../utils/common.js';

const BAR_HEIGHT = 55;

const createStatsTemplate = () => (
  `<section class="statistics">
          <h2 class="visually-hidden">Trip statistics</h2>

          <div class="statistics__item">
            <canvas class="statistics__chart" id="money" width="900"></canvas>
          </div>

          <div class="statistics__item">
            <canvas class="statistics__chart" id="type" width="900"></canvas>
          </div>

          <div class="statistics__item">
            <canvas class="statistics__chart" id="time" width="900"></canvas>
          </div>
        </section>
        `
);

const renderMoneyChart = (moneyCtx, allPoints) => {

  const dataForMoneySorted = createDataForStatistic(allPoints, 'price');

  moneyCtx.height = BAR_HEIGHT * Object.keys(dataForMoneySorted).length;

  const  moneyChart = new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: Object.keys(dataForMoneySorted),
      datasets: [{
        data: Object.values(dataForMoneySorted),
        backgroundColor:  ColorStatistic.BACKGROUND,
        hoverBackgroundColor:  ColorStatistic.BACKGROUND,
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: ColorStatistic.COLOR,
          anchor: 'end',
          align: 'start',
          formatter: (data) => `€ ${data}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: ColorStatistic.FONT,
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: ColorStatistic.FONT,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });

  return moneyChart;

};


const renderTypeChart = (typeCtx, allPoints) => {

  const dataForMoneySorted = createDataForStatistic(allPoints);

  typeCtx.height = BAR_HEIGHT * Object.keys(dataForMoneySorted).length;

  const typeChart = new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: Object.keys(dataForMoneySorted),
      datasets: [{
        data: Object.values(dataForMoneySorted),
        backgroundColor:  ColorStatistic.BACKGROUND,
        hoverBackgroundColor:  ColorStatistic.BACKGROUND,
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: ColorStatistic.COLOR,
          anchor: 'end',
          align: 'start',
          formatter:  (data) => `${data}`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: ColorStatistic.FONT,
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: ColorStatistic.FONT,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });

  return typeChart;
};

const renderTimeChart = (typeCtx, allPoints) => {

  const dataForMoneySorted = createDataForStatistic(allPoints, 'time');

  typeCtx.height = BAR_HEIGHT * Object.keys(dataForMoneySorted).length;

  const timeChart = new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels:  Object.keys(dataForMoneySorted),
      datasets: [{
        data: Object.values(dataForMoneySorted),
        backgroundColor:  ColorStatistic.BACKGROUND,
        hoverBackgroundColor:  ColorStatistic.BACKGROUND,
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: ColorStatistic.COLOR,
          anchor: 'end',
          align: 'start',
          formatter:  (data) => `${getTimeFormatted(data)}`,
        },
      },
      title: {
        display: true,
        text: 'TIME',
        fontColor: ColorStatistic.FONT,
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: ColorStatistic.FONT,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });

  return timeChart;
};

export default class StatsView extends SmartView  {

  #moneyChart = null;
  #typeChart = null;
  #timeChart = null;
  _data = null;

  constructor(points) {
    super();

    this._data = points;
    this.#setCharts();

  }

  get template() {
    return createStatsTemplate();
  }

  removeElement = () => {
    super.removeElement();

    if (this.#moneyChart) {
      this.#moneyChart.destroy();
      this.#moneyChart = null;
    }

    if (this.#typeChart) {
      this.#typeChart.destroy();
      this.#typeChart = null;
    }

    if (this.#timeChart) {
      this.#timeChart.destroy();
      this.#timeChart = null;
    }
  }

  restoreHandlers = () => {
    this.#setCharts();
  }

  #setCharts = () => {

    const moneyCtx = this.element.querySelector('#money');
    const typeCtx = this.element.querySelector('#type');
    const timeCtx = this.element.querySelector('#time');

    this.#moneyChart = renderMoneyChart(moneyCtx, this._data);
    this.#typeChart = renderTypeChart(typeCtx, this._data);
    this.#timeChart = renderTimeChart(timeCtx, this._data);
  }
}
