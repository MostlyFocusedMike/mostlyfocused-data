import { Visit } from '../../types';
import { trimRoute } from '../../utils';
import styles from './styles.module.css';

type Props = { visit: Visit; }
export default function VisitCard({ visit }: Props) {
  const { route, referrer, timestamp, ipUuid, country, state } = visit;
  return <li className={styles.visitCard}>
    <p className={styles.route}><strong>{trimRoute(route)}</strong></p>
    <div className={styles.data}>
      <p title={referrer || undefined}><em>{referrer || 'No referrer'}</em></p>
      <p className={styles.ipUuid}>{ipUuid}</p>
      <div className={styles.time}>
        <p>{new Date(timestamp).toLocaleString('en-US')}</p>
        <p>{country}, {state}</p>
      </div>
    </div>
  </li>
}