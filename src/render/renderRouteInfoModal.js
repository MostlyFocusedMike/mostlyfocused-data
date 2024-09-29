import { getVisits } from '../store';

export default function renderRouteInfoModal(buttonText) {
  const button = document.createElement('button');
  console.log('store.visits:', getVisits());
  return /*html*/`
    <button data-open-route=${buttonText}>${buttonText}</button>

    <dialog id="modal">
      <!-- this form is all it takes! -->
      <form method="dialog"><button aria-label='close'>X</button></form>
      <h2>I'm a modal!</h2>
    </dialog>
  `;
}