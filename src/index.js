import fetchHandler from './fetchHandler'
import renderRouteViewCountTable from './render/renderRouteViewTable';
import renderVisitCards from './render/renderVisitCards';
import { addVisits, getVisits } from './store'
import './style.css'

import RouteInfoModal from './components/modals/RouteInfoModal';
import ReferrerInfoModal from './components/modals/ReferrerInfoModal';
import './components/modals/CloseModalButton';
import VisitsByDayChart from './components/charts/VisitsByDayChart';
import VisitsHeatmap from './components/charts/VisitHeatmap';
import ReferrerTotalsTable from './components/ReferrerTotalsTable';
import lifetimeStore from './LifetimeStore';
import RouteTotalsTable from './components/RouteTotalsTable';


customElements.define('route-modal', RouteInfoModal);
customElements.define('referrer-modal', ReferrerInfoModal);

customElements.define('visit-heatmap-chart', VisitsHeatmap);
customElements.define('route-visits-by-day-chart', VisitsByDayChart);
customElements.define('referrer-totals-table', ReferrerTotalsTable);
customElements.define('route-totals-table', RouteTotalsTable);

const renderMain = () => {
  const appEl = document.querySelector('#app')

  appEl.innerHTML = /*html*/`
    <main>
      <hgroup>
        <h1>MostlyFocused on Data</h1>
        <p>Site traffic analysis</p>
      </hgroup>
      <div id='route-view-count-container'></div>
      <route-totals-table></route-totals-table>
      <h3>What's a visit?</h3>
      <p>
        Visits are the number of page loads, and unique visits is the number of different IP addresses that have loaded the site. So a person loading the the page 10 times over the month, that +10 visits, but +1 visitor.
      </p>
      <p>
        That goes by page, so one user loading every page once would be +1 visit to each page and +1 unique visit to each page as well.
      </p>
      <referrer-totals-table></referrer-totals-table>
      <div id='visit-cards-container'></div>
    </main>
  `;
}

const main = async () => {
  renderMain();
  const [err, { visits }] = await fetchHandler('/api/hosts/1/visits');
  const [err2, lifetimeTotals] = await fetchHandler('/api/statistics/hosts/1/lifetime-totals')
  if (err || err2) return
  addVisits(visits);

  lifetimeStore.updateLifetimes(lifetimeTotals);

  console.log('visits:', getVisits());

  renderRouteViewCountTable(visits);
  renderVisitCards(visits);
};

main();
