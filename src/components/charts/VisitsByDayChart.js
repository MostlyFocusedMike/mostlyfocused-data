import Chart from 'chart.js/auto';
import { dateStr } from '../../utils';
import visitsStore from '../../stores/VisitsStore';

const getListOfDaysInMonth = (monthNum, year = 2024) => {
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
};

const getNumOfVisitsPerDay = (visits) => {
  const routeHitsByDay = visits.reduce((hash, { timestamp, ipUuid}) => {
    const date = new Date(timestamp).toLocaleDateString();
    hash[date] ||= { visits: 0, uniqueVisits: 0, ipUuids: {}, timestamp };
    hash[date].visits += 1;

    if (!hash[date].ipUuids[ipUuid]) {
      hash[date].ipUuids[ipUuid] = true;
      hash[date].uniqueVisits += 1;
    }

    return hash
  }, {});

  // TODO: these have to be changed when you allow queries by month and year
  const currentMonth = (new Date()).getMonth() + 1;
  const currentYear = (new Date()).getFullYear();
  const datesForMonth = getListOfDaysInMonth(currentMonth, currentYear);

  const empty = { visits: 0, uniqueVisits: 0 }
  const values = datesForMonth.map(date => (routeHitsByDay[date] || empty));
  const dates = datesForMonth.map(date => ({ date, label: dateStr(date)}))
  const maxVal = Math.floor(Math.max(...values.map(v => v.visits)) * 1.25);
  const maxY = maxVal + (maxVal % 2 ? 1 : 0)

  return [dates, values, maxY];
};

class VisitsByDayChart extends HTMLElement {
  static observedAttributes = ['is_open']

  connectedCallback() {
    this.route = this.dataset.route;
    this.referrer = this.dataset.referrer;
    if (this.route && this.referrer) throw new Error('Must pick route or referrer');

    this.setup();
    this.render();
    visitsStore.onUpdateVisits(this.render);
  }

  setup = () => {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-label', 'Total hits on route by day')
    canvas.role="img"
    Object.assign(canvas.style, { width: '95%', maxWidth: '80rem', margin: '1rem auto'});
    this.append(canvas);

    this.canvas = canvas;
  }

  selectVisits() {
    if (this.route) return visitsStore.getVisitsByRoute(this.route);
    if (this.referrer) return visitsStore.getVisitsByReferrer(this.referrer);
    if (!this.route && !this.referrer) return visitsStore.getVisits();
  }

  render = () => {
    const [dateLabels, values, maxY] = getNumOfVisitsPerDay(this.selectVisits());

    const defaultFormats = { lineTension: 0.05, fill: true };
    const datasets = [
      { ...defaultFormats, label: 'Unique by day', data: values.map(v => v.uniqueVisits) },
      { ...defaultFormats, label: 'Visits by day', data: values.map(v => v.visits) },
    ];

    const barData = { labels: dateLabels.map(d => d.label), datasets };
    if (this.referrer) barData.datasets.shift(); // unique visits clutter this view

    const options = {
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
    }
    const lineConfig = { type: 'line', data: barData, options };

    this.chart?.destroy();
    this.chart = new Chart(this.canvas, lineConfig);
  }

  // this is a quirk dealing with modals, there should be a fix
  renderNewChart() {
    this.chart?.destroy();
    requestAnimationFrame(this.render);
  }
}

customElements.define('route-visits-by-day-chart', VisitsByDayChart);
