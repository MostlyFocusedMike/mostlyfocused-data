import { LifetimeAndMonthRouteTotal, LifetimeRouteTotal, Visit } from "../types";
import { groupBy } from "../utils";
import RouteVisitsModal from "./modals/RouteVisitsModal";
import RouteLink from "./RouteLink";

type Props = {
  monthlyTotal: number;
  monthlyVisits: Visit[];
  routeTotals: LifetimeRouteTotal[]
}

export default function MainRouteTotalsTable(props: Props) {
  const { monthlyTotal, monthlyVisits, routeTotals } = props;
  if (!monthlyVisits || !routeTotals) return null;

  const addMonthVisits = (routeTotal: LifetimeAndMonthRouteTotal) => {
    const visits = monthVisitsByRoute[routeTotal.route] || [];
    routeTotal.monthTotal = visits.length;
    routeTotal.monthUnique = (new Set(visits.map(route => route.ipUuid))).size;

    return routeTotal;
  };

  const monthVisitsByRoute = groupBy(monthlyVisits, ({ route }) => route); // TODO: remove polyfill dec 2026

  const lifetimeAndMonthTotals = (structuredClone(routeTotals) as LifetimeAndMonthRouteTotal[])
    .map(addMonthVisits)
    .toSorted((a, b) => b.monthTotal - a.monthTotal);

  const lifetimeSiteTotals = lifetimeAndMonthTotals.reduce((a: number, v) => a + v.total, 0);

  return <section aria-describedby="route-totals-header">
    <h2 id='route-totals-header'>Route Totals Count</h2>
    <p>Lifetime Total: {lifetimeSiteTotals}</p>
    <p>Month Total: {monthlyTotal}</p>
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
              <td><RouteVisitsModal route={route} /></td>
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
