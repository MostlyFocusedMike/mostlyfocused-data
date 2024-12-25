import { Visit } from "../types"
import { groupBy, trimReferrer } from "../utils";

export default function ReferrerByRouteTable({ route, visits }: { visits: Visit[], route: string }) {
  const routeVisits = visits.filter((visit) => route === visit.route)
  const referrerVisits = groupBy(routeVisits, ({ referrer }) => referrer || 'No referrer');

  const result = Object.keys(referrerVisits)
    .map(referrer => {
      const visits = referrerVisits[referrer];
      const total = visits.length;
      const unique = (new Set(visits.map(({ ipUuid }) => ipUuid))).size;
      return { referrer, total, unique }
    })
    .toSorted((a, b) => b.total - a.total)

  return <table>
    <thead>
      <tr>
        <th>Total</th>
        <th>Unique</th>
        <th>Route</th>
      </tr>
    </thead>
    <tbody>
      {
        result.map(({ referrer, total, unique }) => {
          return <tr key="referrer">
            <td>{total}</td>
            <td>{unique}</td>
            <td>{trimReferrer(referrer)}</td>
          </tr>
        })
      }
    </tbody>
  </table>
}