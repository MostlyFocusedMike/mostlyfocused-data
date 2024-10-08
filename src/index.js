import fetchHandler from './fetchHandler'
import renderReferrerCountTable from './render/renderReferrerTable';
import renderRouteViewCountTable from './render/renderRouteViewTable';
import renderVisitCards from './render/renderVisitCards';
import './style.css'
import { addVisits } from './store'

import RouteInfoModal from './components/modals/RouteInfoModal';
import ReferrerInfoModal from './components/modals/ReferrerInfoModal';
import CloseModalButton from './components/modals/CloseModalButton';
import VisitsByDayChart from './components/charts/VisitsByDayChart';
import VisitsHeatmap from './components/charts/VisitHeatmap';

customElements.define('route-modal', RouteInfoModal);
customElements.define('referrer-modal', ReferrerInfoModal);
customElements.define('close-modal', CloseModalButton);

customElements.define('visit-heatmap-chart', VisitsHeatmap);
customElements.define('route-visits-by-day-chart', VisitsByDayChart);

const renderMain = () => {
  const appEl = document.querySelector('#app')

  appEl.innerHTML = /*html*/`
    <main>
      <hgroup>
        <h1>MostlyFocused on Data</h1>
        <p>Site traffic analysis</p>
      </hgroup>
      <div id='route-view-count-container'></div>
      <div id='referrer-count-container'></div>
      <div id='visit-cards-container'></div>
    </main>
  `;
}

const main = async () => {
  renderMain();

  const [err, { visits }] = await fetchHandler('/api/hosts/1/visits');
  if (err) return
  console.log('visits:', visits);
  addVisits(visits);

  renderRouteViewCountTable(visits);
  renderReferrerCountTable(visits)
  renderVisitCards(visits);
};

main();
