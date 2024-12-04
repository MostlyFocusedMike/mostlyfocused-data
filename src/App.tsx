import MonthRouteVisitsSection from "./components/MonthRouteVisitsSection";
import MainRouteTotalsTable from "./components/MainRouteTotalsTable";
import MainReferrerTotalsTable from "./components/MainReferrerTotalsTable";
import { useGetMonthlyViews } from "./api/get-monthly-views";
import { useGetLifetimeTotals } from "./api/lifetime-totals";

function App() {
  const { data: lifetimeTotals } = useGetLifetimeTotals();
  const { data: monthlyVisits } = useGetMonthlyViews();
  if (!lifetimeTotals || !monthlyVisits) return null;

  const { referrerTotals, routeTotals } = lifetimeTotals;

  return (
    <main>
      <hgroup>
        <h1>MostlyFocused On Data</h1>
        <p>Traffic Analysis for my site</p>
      </hgroup>
      <MonthRouteVisitsSection monthlyVisits={monthlyVisits.visits} />
      <MainRouteTotalsTable />
      <MainReferrerTotalsTable monthlyVisits={monthlyVisits.visits} referrerTotals={referrerTotals} />
    </main>
  )
}

export default App
