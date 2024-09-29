import { $m, trimSite } from "../utils";

const calculatePageData = (visits) => {
  return visits.reduce((acc, { referrer }) => {
    if (!referrer) return acc;

    acc[referrer] ||= { referrer, hits: 0};
    acc[referrer].hits += 1;

    return acc;
  }, {});
};

const renderTableRow = ({ referrer, hits }) => {
  return /*html*/`<tr>
  <td>${hits}</td>
    <td title="${trimSite(referrer)}">${trimSite(referrer)}</td>
  </tr>`;
};

export default function renderReferrerCountTable(visits) {
  const container = document.querySelector('#referrer-count-container');
  console.log('container:', container);

  const referrerData = Object.values(calculatePageData(visits))
  referrerData.sort((a,b) => {
    if (a.hits === b.hits) {
      const textA = a.referrer.toUpperCase();
      const textB = b.referrer.toUpperCase();
      return (textB < textA) ? -1 : (textB > textA) ? 1 : 0;
    }
    return b.hits - a.hits
  })
  console.log('pageData:', referrerData);
  container.innerHTML = /*html*/`
    <section aria-describedby="referrer-count-header">
      <h2 id='referrer-count-header'>Referrer Count</h2>
      <table>
        <tr>
          <th>Hits</th>
          <th>Referrer</th>
        </tr>
        ${$m(referrerData, renderTableRow)}
      </table>
    </section>
  `;
}