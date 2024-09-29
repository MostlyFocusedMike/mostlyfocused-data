export default class CloseModalButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<form method="dialog"><button aria-label='close'>X</button></form>`;
  }
}