import Chart, { plugins } from 'chart.js/auto';
import { getVisits } from '../../store';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const printNiceHour = (hour) => {
  if (hour === 0) return '12 AM';
  if (hour < 12) return `${hour} AM`;
  if (hour === 12) return '12 PM';
  return `${hour - 12} PM`;
}

const setup = (timestamps) => {
  const results = []
  const timeHash = Array(7).fill(1).reduce((timeHash, _, day) => {
    timeHash[day] = Array(24).fill(1).reduce((hourHash, _, hour) => {
      hourHash[hour] = 0;
      return hourHash;
    }, {})
    return timeHash;
  }, {});

  for (let time of timestamps) {
    const date = new Date(time);
    const day = date.getDay();
    const hour = date.getHours();
    timeHash[day][hour] += 1
  }

  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 24; j++) {
      const day = i;
      const hour = j;
      const radius = timeHash[day][hour]
      if (!radius) continue;

      results.push({ x: hour, y: days[day], r: radius });
    }
  }

  return results;
}

export default class VisitsHeatmap extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-label', 'Total hits on route by day')
    canvas.role="img"
    Object.assign(canvas.style, { width: '95%', maxWidth: '40rem', margin: '1rem auto'});
    this.append(canvas);
    this.canvas = canvas;

    const timestamps = getVisits().map(({ timestamp }) => timestamp);
    const results = setup(timestamps);
    const data = {
      datasets: [{
        label: 'Visit Heatmap',
        data: results,
        backgroundColor: 'rgb(255, 99, 132)'
      }]
    };
    const lineConfig = {
      type: 'bubble',
      data,
      options: {
        scales: {
          y: { type: 'category', labels: days },
          x: {
            title: { display: true, text: 'Hours' },
            ticks: {
              callback: printNiceHour,
            },
            min: 0,
            max: 23,
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: ({ dataset, dataIndex}) => {
                const { x, y, r} = dataset.data[dataIndex];
                return `${printNiceHour(x)} on ${y} hits: ${r}`
              }
            }
          }
        }
      }
    };

    this.chart = new Chart(this.canvas, lineConfig);
  }
}