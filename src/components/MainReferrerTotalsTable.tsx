import { LifetimeAndMonthReferrerTotal, LifetimeReferrerTotal, Visit } from "../types";

type Props = {
  monthlyVisits: Visit[];
  referrerTotals: LifetimeReferrerTotal[]
}

export default function MainReferrerTotalsTable(props: Props) {
  const { monthlyVisits, referrerTotals } = props;
  if (!referrerTotals || !monthlyVisits) return null;

  const addMonthVisits = (routeTotal: LifetimeAndMonthReferrerTotal) => {
    const visits = monthVisitsByRoute[routeTotal.referrer] || [];
    routeTotal.monthTotal = visits.length;

    return routeTotal;
  };


  const monthVisitsByRoute = Object.groupBy(monthlyVisits, ({ referrer }) => referrer);

  const lifetimeAndMonthTotals = (structuredClone(referrerTotals) as LifetimeAndMonthReferrerTotal[])
    .map(addMonthVisits)
    .toSorted((a, b) => b.monthTotal - a.monthTotal);

  return <section aria-describedby="referrer-totals-table">
    <h2 id='referrer-totals-table'>Referrer Totals Count</h2>
    <table>
      <thead>
        <tr>
          <th>Total Visits</th>
          <th>Monthly Visits</th>
          <th>Referrer</th>
        </tr>
      </thead>
      <tbody>
        {
          lifetimeAndMonthTotals.map(({ total, monthTotal, referrer }) => {
            return <tr key={referrer}>
              <td>{total}</td>
              <td>{monthTotal}</td>
              <td>{referrer}</td>
            </tr>
          })
        }
      </tbody>
    </table>
  </section>
}
