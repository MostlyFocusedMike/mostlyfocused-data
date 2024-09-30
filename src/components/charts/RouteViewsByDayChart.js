import Chart from 'chart.js/auto';
import { getVisits } from "../../store";
import { dateStr } from '../../utils';

const numVisitsByDay = (visits) => {
  // we need the timestamp for accurate dates
  // new Date('2024-09-22') => the 21st
  // new Date(timestamp) => timezone data keeps it the
  // the '2024-09-22' is useful for collating the visits on that day only
  // and yes, I'm pretty sure that we're risking the edge hours going in the wrong day, that's ok for now
  const routeHitsByDay = visits.reduce((hash, { timestamp, ipUuid}) => {
    const date = timestamp.slice(0, 10)
    hash[date] ||= { visits: 0, uniqueVisits: 0, ipUuids: {}, timestamp };
    hash[date].visits += 1;

    if (!hash[date].ipUuids[ipUuid]) {
      hash[date].ipUuids[ipUuid] = true;
      hash[date].uniqueVisits += 1;
    }

    return hash
  }, {})

  let dates = Object.keys(routeHitsByDay).sort()
  const values = dates.map(date => routeHitsByDay[date]);
  dates = values.map(({ timestamp }) => dateStr(timestamp));
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
          label: 'Visits by day',
          data: values.map(v => v.visits)
        },
        {
          label: 'Unique by day',
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
                console.log('date:', date);
                const dayOfWeek = new Date(date).toLocaleDateString('en-us', { weekday: 'long'});
                return `${dayOfWeek}, ${date.slice(3)}`;
              }
            }
          }
        },
      },
    };

    new Chart(canvas, lineConfig);
  }
}
