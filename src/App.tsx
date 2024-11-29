import MonthRouteVisitsChart from "./components/charts/MonthRouteVisitsChart";
import MainRouteTotalsTable from "./components/MainRouteTotalsTable";

function App() {
  return (
    <main>
      <hgroup>
        <h1>MostlyFocused On Data</h1>
        <p>Traffic Analysis for my site</p>
      </hgroup>
      <MonthRouteVisitsChart />
      <MainRouteTotalsTable />
    </main>
  )
}

export default App
