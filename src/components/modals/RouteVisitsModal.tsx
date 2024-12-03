import { useGetMonthlyViews } from "../../api/get-monthly-views";
import { formatRouteName } from "../../utils";
import VisitsByRouteChart from "../charts/VisitsByRouteChart";
import Modal from "./Modal";

export default function RouteVisitsModal({ route }: { route: string; }) {
  const { data } = useGetMonthlyViews();
  if (!data) return null;

  const routeVisits = data.visits.filter((visit) => visit.route === route);
  console.log('routeVisits:', routeVisits);

  return <Modal
    openBtnText={route}
    heading={formatRouteName(route)}
  >
    <VisitsByRouteChart visits={routeVisits} />
  </Modal>
}