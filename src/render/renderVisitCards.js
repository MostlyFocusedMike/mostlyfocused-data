import { $m, timeStr } from "../utils";

const renderVisitCard = ({ country, state, timestamp, ipUuid, referrer, route }) => {
  return /*html*/`<li class="visit-card">
    <p>Route: <b>${route.replace('/pages/articles', '')}</b></p>
    <p>Time: ${timeStr(timestamp)}</p>
    <p>Location: <b>${country}</b>, ${state}</p>
    <p class="small-text">Ref: ${referrer?.replace(/https:\/\/(www.)?/, '')}</p>
    <p>IP: ${ipUuid}</p>
  </li>`;
}

export default function renderVisitCards(visits) {
  const container = document.querySelector('#visit-cards-container');

  container.innerHTML = /*html*/`
    <section aria-describedby="visit-card-header">
      <h2 id='visit-card-header'>Visit Cards</h2>
      <ul>
        ${$m(visits, renderVisitCard)}
      </ul>
    </section>
  `;
}