import fetchHandler from './fetchHandler'
import visitsStore from './stores/VisitsStore';
import lifetimeStore from './stores/LifetimeStore';
import './components/modals/CloseModalButton';
import './components/modals/RouteInfoModal';
import './components/modals/ReferrerInfoModal';
import './components/charts/VisitsByDayChart';
import './components/ReferrerTotalsTable';
import './components/RouteTotalsTable';
import './components/VisitCards';
import './components/MainApp';
import './style.css';

const main = async () => {
  const [err, { visits }] = await fetchHandler('/api/hosts/1/visits');
  const [err2, lifetimeTotals] = await fetchHandler('/api/statistics/hosts/1/lifetime-totals')
  if (err || err2) return
  visitsStore.updateVisits(visits);
  lifetimeStore.updateLifetimes(lifetimeTotals);
};

main();
