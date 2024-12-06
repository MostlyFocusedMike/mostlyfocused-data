import { useId } from "react";
import VisitsByRouteChart from "../charts/VisitsByRouteChart";
import { Visit } from "../../types";


type Props = { monthlyVisits: Visit[] }
export default function MonthRouteVisitsChartSection({ monthlyVisits }: Props) {
  const headerId = useId();
  if (!monthlyVisits) return null;

  return (
    <section aria-describedby={headerId}>
      <h2 id={headerId}>Monthly Hits</h2>
      <div style={{ width: '100%', maxWidth: '70rem', margin: '0 auto' }}>
        <VisitsByRouteChart visits={monthlyVisits} />
      </div>
    </section>
  );
}