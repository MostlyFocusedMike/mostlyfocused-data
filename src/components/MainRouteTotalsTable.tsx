import { useGetMonthlyViews } from "../api/get-monthly-views";
import { useGetLifetimeTotals } from "../api/lifetime-totals"
import { LifetimeAndMonthRouteTotal } from "../types";
import { formatRouteName } from "../utils";
import RouteLink from "./RouteLink";

export default function MainRouteTotalsTable() {
  const addMonthVisits = (routeTotal: LifetimeAndMonthRouteTotal) => {
    const visits = monthVisitsByRoute[routeTotal.route] || [];
    routeTotal.monthTotal = visits.length;
    routeTotal.monthUnique = (new Set(visits.map(route => route.ipUuid))).size;

    return routeTotal;
  };

  const { data: lifetimeTotals } = useGetLifetimeTotals();
  const { data: monthlyVisits } = useGetMonthlyViews();
  if (!lifetimeTotals || !monthlyVisits) return null;

  const { routeTotals } = lifetimeTotals;
  const monthVisitsByRoute = Object.groupBy(monthlyVisits.visits, ({ route }) => route);

  const lifetimeAndMonthTotals = (structuredClone(routeTotals) as LifetimeAndMonthRouteTotal[])
    .map(addMonthVisits)
    .toSorted((a, b) => b.monthTotal - a.monthTotal);

  const lifetimeSiteTotals = lifetimeAndMonthTotals.reduce((a: number, v) => a + v.total, 0);

  return <section aria-describedby="route-totals-header">
    <h2 id='route-totals-header'>Route Totals Count</h2>
    <p>Lifetime Total: {lifetimeSiteTotals}</p>
    <p>Month Total: {monthlyVisits.total}</p>
    <table>
      <thead>
        <tr>
          <th></th>
          <th colSpan={2}>Month</th>
          <th colSpan={2}>Total</th>
        </tr>
        <tr>
          <th>Page</th>
          <th>Visits</th>
          <th>(Unique)</th>
          <th>Visits</th>
          <th>(Unique)</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          lifetimeAndMonthTotals.map(({ total, unique, monthTotal, monthUnique, route }) => {
            return <tr key={route}>
              <td>{formatRouteName(route)}</td>
              <td>{monthTotal}</td>
              <td>{monthUnique}</td>
              <td>{total}</td>
              <td>{unique}</td>
              <td><RouteLink route={route} /></td>
            </tr>
          })
        }
      </tbody>
    </table>
  </section>
}
