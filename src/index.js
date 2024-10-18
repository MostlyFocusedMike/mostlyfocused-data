import fetchHandler from './fetchHandler'
import renderRouteViewCountTable from './render/renderRouteViewTable';
import renderVisitCards from './render/renderVisitCards';
import './style.css'
import { addVisits, getVisits } from './store'

import RouteInfoModal from './components/modals/RouteInfoModal';
import ReferrerInfoModal from './components/modals/ReferrerInfoModal';
import CloseModalButton from './components/modals/CloseModalButton';
import VisitsByDayChart from './components/charts/VisitsByDayChart';
import VisitsHeatmap from './components/charts/VisitHeatmap';
import ReferrerTotalsTable from './components/ReferrerTotalsTable';
import lifetimeStore from './LifetimeStore';


customElements.define('route-modal', RouteInfoModal);
customElements.define('referrer-modal', ReferrerInfoModal);
customElements.define('close-modal', CloseModalButton);

customElements.define('visit-heatmap-chart', VisitsHeatmap);
customElements.define('route-visits-by-day-chart', VisitsByDayChart);
customElements.define('referrer-totals-table', ReferrerTotalsTable);

const renderMain = () => {
  const appEl = document.querySelector('#app')

  appEl.innerHTML = /*html*/`
    <main>
      <hgroup>
        <h1>MostlyFocused on Data</h1>
        <p>Site traffic analysis</p>
      </hgroup>
      <div id='route-view-count-container'></div>
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
