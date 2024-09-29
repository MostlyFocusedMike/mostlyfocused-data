import { getVisitByRoute } from "../store";
import makeReferrerCountsTable from "../templates/makeReferrerTable";

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
      <form method="dialog"><button aria-label='close'>X</button></form>
      <h2>${this.route}</h2>
      ${makeReferrerCountsTable(routeVisits)}
    `;

    button.onclick = () => modal.showModal();
    modal.addEventListener('click', handleBackdropClick(modal));

    this.append(button, modal);
  }
}