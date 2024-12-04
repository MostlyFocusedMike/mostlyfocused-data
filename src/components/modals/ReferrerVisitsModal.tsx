import { useGetMonthlyViews } from "../../api/get-monthly-views";
import VisitsByRouteChart from "../charts/VisitsByRouteChart";
import Modal from "./Modal";

export default function ReferrerVisitsModal({ referrer }: { referrer: string; }) {
  const { data } = useGetMonthlyViews();
  if (!data) return null;

  const referrerVisits = data.visits.filter((visit) => visit.referrer === referrer);

  return <Modal openBtnText={referrer} heading={referrer} >
    <VisitsByRouteChart visits={referrerVisits} />
  </Modal>
}