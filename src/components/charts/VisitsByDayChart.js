import Chart from 'chart.js/auto';
import { getVisitByReferrer, getVisitByRoute, getVisits } from "../../store";
import { dateStr } from '../../utils';

function getDatesInRange(monthNum, year = 2024) {
  const format = (time) => new Date(time).toLocaleDateString();
  const month = monthNum < 10 ? `0${monthNum}` : monthNum;
  let dayIterator = new Date(`${year}-${month}-01T00:00`);
  const dates = [format(dayIterator)];
  dayIterator.setDate(dayIterator.getDate() + 1);

  while (dayIterator.getDate() != 1) {
    dates.push(format(dayIterator));
    dayIterator.setDate(dayIterator.getDate() + 1);
  }

  return dates;
}

const numVisitsByDay = (visits) => {
  const routeHitsByDay = visits.reduce((hash, { timestamp, ipUuid}) => {
    const date = new Date(timestamp).toLocaleDateString();
    hash[date] ||= { visits: 0, uniqueVisits: 0, ipUuids: {}, timestamp };
    hash[date].visits += 1;

    if (!hash[date].ipUuids[ipUuid]) {
      hash[date].ipUuids[ipUuid] = true;
      hash[date].uniqueVisits += 1;
    }

    return hash
  }, {})
  console.log('routeHitsByDay:', routeHitsByDay);

  // TODO: these have to be changed when you allow queries by month and year
  const currentMonth = (new Date()).getMonth() + 1;
  const currentYear = (new Date()).getFullYear();
  const datesForMonth = getDatesInRange(currentMonth, currentYear);

  const empty = { visits: 0, uniqueVisits: 0 }
  const values = datesForMonth.map(date => (routeHitsByDay[date] || empty));
  const dates = datesForMonth.map(date => ({ date, label: dateStr(date)}))
  const maxVal = Math.floor(Math.max(...values.map(v => v.visits)) * 1.25);
  const maxY = maxVal + (maxVal % 2 ? 1 : 0)

  return [dates, values, maxY];
}

export default class VisitsByDayChart extends HTMLElement {
  static observedAttributes = ['is_open']

  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;

    if (property === 'is_open' && !!newValue) {
      this.chart?.destroy()
      requestAnimationFrame(this.render)
    }
  }

  connectedCallback() {
    this.route = this.dataset.route;
    this.referrer = this.dataset.referrer;
    if (this.route && this.referrer) throw new Error('Must pick route or referrer');

    this.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-label', 'Total hits on route by day')
    canvas.role="img"
    Object.assign(canvas.style, { width: '95%', maxWidth: '80rem', margin: '1rem auto'});
    this.append(canvas);

    this.canvas = canvas;
    this.render();
  }

  render = () => {
    let visits;
    if (this.route) visits = getVisitByRoute(this.route);
    if (this.referrer) visits = getVisitByReferrer(this.referrer);
    if (!this.route && !this.referrer) visits = getVisits();

    const [dateLabels, values, maxY] = numVisitsByDay(visits)

    const barData = {
      labels: dateLabels.map(d => d.label),
      datasets: [
        { lineTension: 0.05, label: 'Unique by day', data: values.map(v => v.uniqueVisits), fill: true },
        { lineTension: 0.05, label: 'Visits by day', data: values.map(v => v.visits), fill: true },
      ]
    };
    if (this.referrer) barData.datasets.shift();

    const lineConfig = {
      type: 'line',
      data: barData,
      options: {
        spanGaps: false,
        scales: { y: { beginAtZero: true, max: maxY }, x: { grid: { display: false }}},
        plugins: {
          tooltip: {
            callbacks: {
              title: ([{ dataIndex}]) => {
                const date = dateLabels[dataIndex].date;
                const dayOfWeek = new Date(date).toLocaleDateString('en-us', { weekday: 'long'});
                return `${dayOfWeek}, ${dateStr(date).slice(3)}`;
              }
            }
          }
        },
      },
    };

    this.chart = new Chart(this.canvas, lineConfig);
  }

  open() { this.setAttribute('is_open', true) }
  hide() { this.removeAttribute('is_open') }
}
