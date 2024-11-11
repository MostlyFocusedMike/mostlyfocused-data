import makeReferrerCountsTable from "../../templates/makeReferrerCountsTable";
import { trimRoute } from "../../utils";
import visitsStore from "../../VisitsStore";
import { handleBackdropClick } from "./utils";

class RouteInfoModal extends HTMLElement {
  connectedCallback() {
    this.route = this.childNodes[0].textContent;

    this.render();
  }

  handleShowModal = () => {
    const routeVisits = visitsStore.getVisitsByRoute(this.route);

    this.modal.innerHTML = /*html*/`
      <close-modal></close-modal>
      <h2>${trimRoute(this.route)}</h2>
      <route-visits-by-day-chart data-route=${this.route} ></route-visits-by-day-chart>
      ${makeReferrerCountsTable(routeVisits)}
    `;
    this.modal.showModal();
    this.modal.querySelector('route-visits-by-day-chart').renderNewChart();
  };

  render = () => {
    this.innerHTML = '';

    const button = document.createElement('button');
    button.textContent = trimRoute(this.route);

    this.modal = document.createElement('dialog');

    button.onclick = this.handleShowModal;
    this.modal.onclick = handleBackdropClick(this.modal);

    this.append(button, this.modal);
  }
}

customElements.define('route-modal', RouteInfoModal);