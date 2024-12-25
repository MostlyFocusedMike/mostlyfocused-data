import { useGetMonthlyViews } from "../../api/get-monthly-views";
import { trimRoute } from "../../utils";
import VisitsByRouteChart from "../charts/VisitsByRouteChart";
import ReferrerByRouteTable from "../ReferrerByRouteTable";
import Modal from "./Modal";

export default function RouteVisitsModal({ route }: { route: string; }) {
  const { data } = useGetMonthlyViews();
  if (!data) return null;

  const routeVisits = data.visits.filter((visit) => visit.route === route);

  return <Modal
    openBtnText={route}
    heading={trimRoute(route)}
  >
    <VisitsByRouteChart visits={routeVisits} />
    <ReferrerByRouteTable visits={routeVisits} route={route} />
  </Modal>
}