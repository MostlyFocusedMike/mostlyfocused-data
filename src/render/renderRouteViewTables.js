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
    <td>${route}</td>
    <td>${visits}</td>
    <td>${uniqueVisits}</td>
  </tr>`;
};

export default function renderRouteViewCountTable(visits) {
  const container = document.querySelector('#page-view-count-container');

  const pageData = Object.values(calculatePageData(visits))
  pageData.sort((a,b) => {
    if (a.visits === b.visits) {
      const textA = a.route.toUpperCase();
      const textB = b.route.toUpperCase();
      return (textB < textA) ? -1 : (textB > textA) ? 1 : 0;
    }
    return b.visits - a.visits
  })
  console.log('pageData:', pageData);
  container.innerHTML = /*html*/`
    <section aria-describedby="page-view-count-header">
      <h2 id='page-view-count-header'>Page View Count</h2>
      <table>
        <tr>
          <th>Page</th>
          <th>Visits</th>
          <th>Unique Visits</th>
        </tr>
        ${$m(pageData, renderTableRow)}
      </table>
    </section>
  `;
}