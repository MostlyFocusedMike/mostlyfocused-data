import { Visit } from '../../types';
import VisitCard from '../VisitCard';
import styles from './styles.module.css';

type Props = { monthlyVisits: Visit[]; }
export default function VisitsInDepthCards({ monthlyVisits }: Props) {

  return <section aria-describedby="cards-header">
    <h2 id="cards-header">Visits In Depth</h2>
    <ul className={styles.cards}>
      {monthlyVisits.map(visit => <VisitCard key={visit.id} visit={visit} />)}
    </ul>
  </section>
}