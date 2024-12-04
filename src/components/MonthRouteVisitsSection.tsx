import { useId } from "react";
import VisitsByRouteChart from "./charts/VisitsByRouteChart";
import { Visit } from "../types";

type Props = { monthlyVisits: Visit[] }

export default function MonthRouteVisitsSection({ monthlyVisits }: Props) {
  const headerId = useId();
  if (!monthlyVisits) return null;

  return (
    <section aria-describedby={headerId}>
      <h2 id={headerId}>Monthly Hits</h2>
      <VisitsByRouteChart visits={monthlyVisits} />
    </section>
  );
}