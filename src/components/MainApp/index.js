class MainApp extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render = () => {
    this.innerHTML = /*html*/`
    <main>
      <hgroup>
        <h1>MostlyFocused on Data</h1>
        <p>Site traffic analysis</p>
      </hgroup>
      <section aria-describedby="route-view-count-header">
        <h2 id='route-view-count-header'>Route Visit Count</h2>
        <route-visits-by-day-chart></route-visits-by-day-chart>
      </section>
      <route-totals-table></route-totals-table>
      <h3>What's a visit?</h3>
      <p>
        Visits are the number of page loads, and unique visits is the number of different IP addresses that have loaded the site. So a person loading the the page 10 times over the month, that +10 visits, but +1 visitor.
      </p>
      <p>
        That goes by page, so one user loading every page once would be +1 visit to each page and +1 unique visit to each page as well.
      </p>

      <referrer-totals-table></referrer-totals-table>
      <visit-cards></visit-cards>
    </main>
  `;
  }
}

customElements.define('main-app', MainApp);
