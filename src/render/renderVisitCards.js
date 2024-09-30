import { $m, timeStr, trimSite } from "../utils";

const renderVisitCard = ({ country, state, timestamp, ipUuid, referrer, route }) => {
  return /*html*/`<li class="visit-card">
    <p>Route: <b>${route.replace('/pages/', '')}</b></p>
    <p>Time: ${timeStr(timestamp)}</p>
    <p>Location: <b>${country}</b>, ${state}</p>
    <p class="small-text">Ref: ${trimSite(referrer)}</p>
    <p>ID: ${ipUuid}</p>
  </li>`;
}

export default function renderVisitCards(visits) {
  const container = document.querySelector('#visit-cards-container');

  container.innerHTML = /*html*/`
    <section aria-describedby="visit-card-header">
      <h2 id='visit-card-header'>Visit Cards</h2>
      <ul id="visit-cards">
        ${$m(visits, renderVisitCard)}
      </ul>
    </section>
  `;
}