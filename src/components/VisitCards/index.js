import { $m, trimSite, html } from "../../utils";
import visitsStore from "../../VisitsStore";

const renderVisitCard = ({ country, state, timestamp, ipUuid, referrer, route }) => {
  return /*html*/`<li class="visit-card">
    <p>Route: <b>${route.replace('/pages/', '')}</b></p>
    <p>Time: ${(new Date(timestamp)).toLocaleString("en-US")}</p>
    <p>Location: <b>${country}</b>, ${state}</p>
    <p class="small-text">Ref: ${trimSite(referrer)}</p>
    <p>ID: ${ipUuid}</p>
  </li>`;
}

class VisitCards extends HTMLElement {
  connectedCallback() {
    this.render();
    visitsStore.onUpdateVisits(this.render)
  }

  render = () => {
    const visits = visitsStore.getVisits();
    console.log('visits in here:', visits);
    this.innerHTML = html`
      <section aria-describedby="visit-card-header">
        <h2 id='visit-card-header'>Visit Cards</h2>
        <ul id="visit-cards">
          ${$m(visits, renderVisitCard)}
        </ul>
      </section>
  `;
  }
}

customElements.define('visit-cards', VisitCards);