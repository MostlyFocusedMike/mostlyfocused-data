import { getVisitByRoute } from "../../store";
import makeReferrerCountsTable from "../../templates/makeReferrerCountsTable";
import { handleBackdropClick } from "./utils";

export default class RouteInfoModal extends HTMLElement {
  connectedCallback() {
    this.route = this.childNodes[0].textContent;

    this.render();
  }

  render() {
    const routeVisits = getVisitByRoute(this.route);

    this.innerHTML = '';

    const button = document.createElement('button');
    button.textContent = this.route;

    const modal = document.createElement('dialog');
    modal.innerHTML = /*html*/`
      <close-modal></close-modal>
      <h2>${this.route}</h2>
      <route-visits-by-day-chart data-route=${this.route} ></route-visits-by-day-chart>
      ${makeReferrerCountsTable(routeVisits)}
    `;

    button.onclick = () => {
      modal.showModal();
      modal.querySelector('route-visits-by-day-chart').open();
    }
    modal.onclick = handleBackdropClick(modal);

    this.append(button, modal);
  }
}