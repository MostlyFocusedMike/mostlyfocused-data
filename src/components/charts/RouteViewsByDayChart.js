import Chart from 'chart.js/auto';
import { getVisits } from "../../store";
import { dateStr } from '../../utils';

const numVisitsByDay = (visits) => {
  const routeHitsByDay = visits.reduce((hash, { timestamp, ipUuid}) => {
    const date = timestamp.slice(0, 10)
    hash[date] ||= { visits: 0, uniqueVisits: 0, ipUuids: {} };
    hash[date].visits += 1;

    if (!hash[date].ipUuids[ipUuid]) {
      hash[date].ipUuids[ipUuid] = true;
      hash[date].uniqueVisits += 1;
    }

    return hash
  }, {})

  let dates = Object.keys(routeHitsByDay).sort()
  const values = dates.map(date => routeHitsByDay[date]);
  dates = dates.map(date => dateStr(date));
  return [dates, values];
}

export default class RouteViewsByDayChart extends HTMLElement {
  connectedCallback() {
    this.route = this.dataset.route
    const visits = getVisits()
    const [dateLabels, values] = numVisitsByDay(visits)

    this.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-label', 'Total hits on route by day')
    canvas.role="img"
    Object.assign(canvas.style, { width: '80%', maxWidth: '50rem', margin: '1rem auto'});
    this.append(canvas); // TODO: why do I have to append before calling Chart?

    const barData = {
      labels: dateLabels,
      datasets: [
        {
          label: 'Hits by day',
          data: values.map(v => v.visits)
        },
        {
          label: 'unique by day',
          data: values.map(v => v.uniqueVisits)
        }
      ]
    };

    const lineConfig = {
      type: 'line',
      data: barData,
      options: {
        scales: {
          y: { beginAtZero: true },
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: ([{ dataIndex}]) => {
                const date = dateLabels[dataIndex]
                const dayOfWeek = new Date(date).toLocaleDateString('en-us', { weekday: 'long'});
                return `${dayOfWeek}, ${date}`;
              }
            }
          }
        },
      },
    };

    new Chart(canvas, lineConfig);
  }
}
