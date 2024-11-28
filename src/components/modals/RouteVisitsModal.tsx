import { formatRouteName } from "../../utils";
import Modal from "./Modal";

export default function RouteVisitsModal({ route }: { route: string; }) {
  const handleClose = () => console.log('closed!', route);

  return <Modal
    openBtnText={route}
    heading={formatRouteName(route)}
    handleClose={handleClose}
  >
    <p>hi there</p>
  </Modal>
}