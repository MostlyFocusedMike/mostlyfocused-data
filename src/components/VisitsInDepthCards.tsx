import { Visit } from "../types"

type Props = {
  monthlyVisits: Visit[];
}
export default function VisitsInDepthCards({ monthlyVisits }: Props) {
  console.log('monthlyVisits:', monthlyVisits);
  return <section>
    <h2>Visits In Depth</h2>
  </section>
}