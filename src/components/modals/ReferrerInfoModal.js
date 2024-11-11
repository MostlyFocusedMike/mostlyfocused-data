import makeRouteCountsTable from "../../templates/makeSimpleRouteCountsTable";
import visitsStore from "../../VisitsStore";
import { handleBackdropClick } from "./utils";

class ReferrerInfoModal extends HTMLElement {
  connectedCallback() {
    this.displayReferrer = this.childNodes[0].textContent;
    this.referrer = this.dataset.referrer;

    this.render();
  }

  render() {
    this.innerHTML = '';
    const referrerHits = visitsStore.getVisitsByReferrer(this.dataset.referrer);

    const button = document.createElement('button');
    button.textContent = this.displayReferrer;

    const modal = document.createElement('dialog');

    button.onclick = () => {
      modal.innerHTML = /*html*/`
        <close-modal></close-modal>
        <h2>${this.displayReferrer}</h2>
        <route-visits-by-day-chart data-referrer=${this.referrer}></route-visits-by-day-chart>
        ${makeRouteCountsTable(referrerHits)}
      `;

      modal.showModal();
      modal.querySelector('route-visits-by-day-chart').renderNewChart();
    }

    modal.onclick = handleBackdropClick(modal);
    this.append(button, modal);
  }
}

customElements.define('referrer-modal', ReferrerInfoModal);