import lifetimeStore from "../../stores/LifetimeStore";
import { $m, html, trimRoute } from "../../utils";

const renderTableRow = ({ total, unique, route }) => {
  return html`<tr>
    <td>${total}</td>
    <td>${unique}</td>
    <td><route-modal>${route}</route-modal></td>
    <td>
      <a
        href="https://mostlyfocused.com${route}"
        target="_blank"
        rel="noopener noreferrer"
      >Link</a>
      </td>
  </tr>`
}

class RouteTotalsTable extends HTMLElement {
  connectedCallback() {
    this.setup();

    lifetimeStore.onUpdateLifetimes(this.renderTableRows);
  }

  disconnectedCallback() {
    lifetimeStore.removeListener(this.handleUpdateLifetimes);
  }

  setup() {
    this.innerHTML = html`
      <section aria-describedby="route-totals-header">
        <h2 id='route-totals-header'>Route Totals Count</h2>
        <table>
          <thead>
            <tr>
              <th>Visits</th>
              <th>(Unique)</th>
              <th>Page</th>
              <th></th>
            </tr>
            <tr>
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
    const totals = lifetimeStore.getLifetimeRouteTotals();
    console.log('totals:', totals);

    this.tableBody.innerHTML = html`
      ${$m(totals, renderTableRow)}
    `;
  }
}

customElements.define('route-totals-table', RouteTotalsTable);
