import { useGetLifetimeTotals } from "./api/lifetime-totals"

function App() {
  const { data: lifetimeTotals } = useGetLifetimeTotals();

  console.log('data:', lifetimeTotals);

  return (
    <main>
      <hgroup>
        <h1>MostlyFocused On Data</h1>
        <p>Traffic Analysis for my site</p>
      </hgroup>
    </main>
  )
}

export default App
