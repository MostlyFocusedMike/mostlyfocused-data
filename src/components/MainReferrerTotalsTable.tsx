import { useGetMonthlyViews } from "../api/get-monthly-views";
import { useGetLifetimeTotals } from "../api/lifetime-totals"

export default function MainReferrerTotalsTable() {
  const addMonthVisits = (routeTotal: any) => {
    const visits = monthVisitsByRoute[routeTotal.referrer] || [];
    routeTotal.monthTotal = visits.length;

    return routeTotal;
  };

  const { data: lifetimeTotals } = useGetLifetimeTotals();
  const { data: monthlyVisits } = useGetMonthlyViews();
  if (!lifetimeTotals || !monthlyVisits) return null;

  const { referrerTotals } = lifetimeTotals;
  const monthVisitsByRoute = Object.groupBy(monthlyVisits.visits, ({ referrer }) => referrer);

  const lifetimeAndMonthTotals = (structuredClone(referrerTotals) as any[])
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
