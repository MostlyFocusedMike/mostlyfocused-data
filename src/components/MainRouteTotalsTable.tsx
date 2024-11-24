import { useGetLifetimeTotals } from "../api/lifetime-totals"
import RouteLink from "./RouteLink";

export default function MainRouteTotalsTable() {
  const { data, isLoading, isError } = useGetLifetimeTotals();
  if (isLoading || isError || !data) return <p>Loading</p>;

  const { routeTotals } = data;
  return <section aria-describedby="route-totals-header">
    <h2 id='route-totals-header'>Route Totals Count</h2>
    <table>
      <thead>
        <tr>
          <th>Visits</th>
          <th>(Unique)</th>
          <th>Page</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          routeTotals.map(({ total, unique, route }) => {
            return <tr key={route}>
              <td>{total}</td>
              <td>{unique}</td>
              <td>{route}</td>
              <td><RouteLink route={route} /></td>
            </tr>
          })
        }
      </tbody>
    </table>
  </section>
}