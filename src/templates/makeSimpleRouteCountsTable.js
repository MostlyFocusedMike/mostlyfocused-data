import { $m } from "../utils";

const calculatePageData = (visits) => {
  return visits.reduce((acc, { route }) => {
    acc[route] ||= { route, visits: 0 };
    acc[route].visits += 1;

    return acc;
  }, {});
};

const renderTableRow = ({ route, visits }) => {
  return /*html*/`<tr>
    <td>${visits}</td>
    <td>${route}</td>
  </tr>`;
};

export default function makeSimpleRouteCountsTable(visits) {
  const pageData = Object.values(calculatePageData(visits))
  pageData.sort((a,b) => {
    if (a.visits === b.visits) {
      const textA = a.route.toUpperCase();
      const textB = b.route.toUpperCase();
      return (textB < textA) ? -1 : (textB > textA) ? 1 : 0;
    }
    return b.visits - a.visits;
  })

  return /*html*/`
    <table>
      <tr>
        <th>Visits</th>
        <th>Page</th>
      </tr>
      ${$m(pageData, renderTableRow)}
    </table>
  `;
}