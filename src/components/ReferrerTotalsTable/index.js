import lifetimeStore from "../../LifetimeStore";
import { $m, html, trimSite } from "../../utils";

const renderTableBody = ({ total, referrer}) => {
  return html`<tr>
    <td>${total}</td>
    <td>
      <referrer-modal data-referrer=${referrer}>
        ${trimSite(referrer)}
      </referrer-modal>
    </td>
  </tr>`
}

export default class ReferrerTotalsTable extends HTMLElement {
  connectedCallback() {
    this.render();

    lifetimeStore.onUpdateLifetimes(this.render);
  }

  disconnectedCallback() {
    lifetimeStore.removeListener(this.handleUpdateLifetimes);
  }

  render = () => {
    const totals = lifetimeStore.getLifetimeReferrerTotals();
    console.log('Referrer lifetime totals:', totals);

    this.innerHTML = html`
    <section aria-describedby="referrer-totals-header">
      <h2 id='referrer-totals-header'>Referrer Totals Count</h2>
      <table>
        <thead>
          <tr>
            <th>Hits</th>
            <th>Referrer</th>
          </tr>
        </thead>
        <tbody>
          ${$m(totals, renderTableBody)}
        </tbody>
      </table>
    </section>
  `;
  console.log('rendered:', );
  }
}