import MonthRouteVisitsSection from "./components/MonthRouteVisitsSection";
import MainRouteTotalsTable from "./components/MainRouteTotalsTable";
import MainReferrerTotalsTable from "./components/MainReferrerTotalsTable";

function App() {
  return (
    <main>
      <hgroup>
        <h1>MostlyFocused On Data</h1>
        <p>Traffic Analysis for my site</p>
      </hgroup>
      <MonthRouteVisitsSection />
      <MainRouteTotalsTable />
      <MainReferrerTotalsTable />
    </main>
  )
}

export default App
