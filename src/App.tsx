import MonthRouteVisitsChartSection from './components/MonthRouterVisitsChartSection';
import MainRouteTotalsTable from "./components/MainRouteTotalsTable";
import MainReferrerTotalsTable from "./components/MainReferrerTotalsTable";
import VisitsInDepthCards from './components/VisitsInDepthCards';
import { useGetMonthlyViews } from "./api/get-monthly-views";
import { useGetLifetimeTotals } from "./api/lifetime-totals";

function App() {
  const { data: lifetimeTotals } = useGetLifetimeTotals();
  const { data: monthlyVisits } = useGetMonthlyViews();
  if (!lifetimeTotals || !monthlyVisits) return null;

  const { referrerTotals, routeTotals } = lifetimeTotals;
  const { visits, total } = monthlyVisits;

  return (
    <main>
      <hgroup>
        <h1>MostlyFocused On Data</h1>
        <p>Traffic Analysis for my site</p>
      </hgroup>
      <MonthRouteVisitsChartSection monthlyVisits={visits} />
      <VisitsInDepthCards monthlyVisits={visits} />
      <MainRouteTotalsTable monthlyVisits={visits} routeTotals={routeTotals} monthlyTotal={total} />
      <MainReferrerTotalsTable monthlyVisits={visits} referrerTotals={referrerTotals} />
    </main>
  )
}

export default App
