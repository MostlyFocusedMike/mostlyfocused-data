import fetchHandler from './fetchHandler'
import renderReferrerCountTable from './render/renderReferrerTable';
import renderRouteViewCountTable from './render/renderRouteViewTable';
import renderVisitCards from './render/renderVisitCards';
import './style.css'

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

  const [err, { visits }] = await fetchHandler('http://localhost:3000/api/hosts/1/visits');
  if (err) return
  console.log('visits:', visits);

  renderVisitCards(visits);
  renderRouteViewCountTable(visits);
  renderReferrerCountTable(visits)
}

main();