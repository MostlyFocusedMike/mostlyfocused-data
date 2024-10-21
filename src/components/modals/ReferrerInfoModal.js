import { getVisitByReferrer } from "../../store";
import makeRouteCountsTable from "../../templates/makeSimpleRouteCountsTable";

const handleBackdropClick = (modal) => (e) => {
  if (!e.target.matches('dialog')) return;
  const { top, bottom, left, right } = e.target.getBoundingClientRect();
  const { clientX: mouseX, clientY: mouseY } = e;

  if (mouseX === 0 && mouseY === 0) return; // https://github.com/facebook/react/issues/7407

  const clickedOutsideOfModalBox = (
    mouseX <= left || mouseX >= right ||
    mouseY <= top || mouseY >= bottom
  );

  if (clickedOutsideOfModalBox) modal.close();
}

export default class ReferrerInfoModal extends HTMLElement {
  connectedCallback() {
    this.displayReferrer = this.childNodes[0].textContent;
    this.referrer = this.dataset.referrer;

    this.render();
  }

  render() {
    const referrerHits = getVisitByReferrer(this.dataset.referrer);

    this.innerHTML = '';

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

      modal.querySelector('route-visits-by-day-chart').open();
    }

    modal.onclick = handleBackdropClick(modal);
    modal.onOpen = () => {
      console.log('hiiiiii:', );
    }

    this.append(button, modal);
  }
}