import { useId } from "react";
import { useGetMonthlyViews } from "../api/get-monthly-views";
import VisitsByRouteChart from "./charts/VisitsByRouteChart";

export default function MonthRouteVisitsSection() {
  const headerId = useId();
  const { data } = useGetMonthlyViews();
  if (!data) return null;

  return (
    <section aria-describedby={headerId}>
      <h2 id={headerId}>Monthly Hits</h2>
      <VisitsByRouteChart visits={data.visits} />
    </section>
  );
}