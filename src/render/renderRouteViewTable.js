import { $m } from "../utils";

const calculatePageData = (visits) => {
  return visits.reduce((acc, { ipUuid, route }) => {
    acc[route] ||= { route, visits: 0, uniqueVisits: 0, ipUuids: {} };
    acc[route].visits += 1;
    if (!acc[route].ipUuids[ipUuid]) {
      acc[route].ipUuids[ipUuid] = true;
      acc[route].uniqueVisits += 1;
    }

    return acc;
  }, {});
};

const renderTableRow = ({ route, visits, uniqueVisits }) => {
  return /*html*/`<tr>
  <td>${visits}</td>
  <td>${uniqueVisits}</td>
  <td><route-modal>${route}</route-modal></td>
  <td>
    <a
      href="https://mostlyfocused.com${route}"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visit ${route}"
    >Link</a></td>
  </tr>`;
};

export default function renderRouteViewCountTable(visits) {
  const container = document.querySelector('#route-view-count-container');

  const pageData = Object.values(calculatePageData(visits))
  pageData.sort((a,b) => {
    if (a.visits === b.visits) {
      const textA = a.route.toUpperCase();
      const textB = b.route.toUpperCase();
      return (textB < textA) ? -1 : (textB > textA) ? 1 : 0;
    }
    return b.visits - a.visits;
  })

  const totalVisits = pageData.reduce((a, { visits }) => a + visits, 0);
  const totalUnique = pageData.reduce((a,v) => a + v.uniqueVisits, 0);

  container.innerHTML = /*html*/`
    <section aria-describedby="route-view-count-header">
      <h2 id='route-view-count-header'>Route Visit Count</h2>
      <route-visits-by-day-chart></route-visits-by-day-chart>
      <table>
        <tr>
          <th>Visits</th>
          <th>(Unique)</th>
          <th>Page</th>
          <th></th>
        </tr>
        <tr>
          <td>${totalVisits}</td>
          <td>${totalUnique}</td>
          <td>Total</td>
        </tr>
        ${$m(pageData, renderTableRow)}
      </table>
      <h3>What's a visit?</h3>
      <p>
        Visits are the number of page loads, and unique visits is the number of different IP addresses that have loaded the site. So a person loading the the page 10 times over the month, that +10 visits, but +1 visitor.
      </p>
      <p>
        That goes by page, so one user loading every page once would be +1 visit to each page and +1 unique visit to each page as well.
      </p>
    </section>
  `;
}