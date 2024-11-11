import lifetimeStore from "../../stores/LifetimeStore";
import { $m, html, trimSite } from "../../utils";

const renderTableRow = ({ total, referrer}) => {
  return html`<tr>
    <td>${total}</td>
    <td>
      <referrer-modal data-referrer=${referrer}>
        ${trimSite(referrer)}
      </referrer-modal>
    </td>
  </tr>`
}

class ReferrerTotalsTable extends HTMLElement {
  connectedCallback() {
    this.setup();

    lifetimeStore.onUpdateLifetimes(this.renderTableRows);
  }

  disconnectedCallback() {
    lifetimeStore.removeListener(this.handleUpdateLifetimes);
  }

  setup() {
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
          <tbody></tbody>
        </table>
      </section>
    `;

    this.tableBody = this.querySelector('tbody');
    this.modal = this.querySelector('my-modal');
    this.renderTableRows();
  }

  renderTableRows = () => {
    const totals = lifetimeStore.getLifetimeReferrerTotals();

    this.tableBody.innerHTML = html`${$m(totals, renderTableRow)}`;
  }
}

customElements.define('referrer-totals-table', ReferrerTotalsTable);
