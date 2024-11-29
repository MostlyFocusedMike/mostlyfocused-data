import { Line } from "react-chartjs-2";
import { useGetMonthlyViews } from "../../api/get-monthly-views";
import { dateStr, getNumOfVisitsPerDay } from "../../utils";



const visitColor = 'rgba(64, 224, 208, 1)';
const lighterVisit = 'rgba(64, 224, 208, 0.5)';
const uniqueColor = 'rgba(147, 51, 234, 1)';
const lighterUniqueVisit = 'rgba(147, 51, 234, .5)';

export default function MonthRouteVisitsChart() {
  const { data } = useGetMonthlyViews();
  if (!data) return null;

  const [dates, values, maxY] = getNumOfVisitsPerDay(data.visits);

  const defaultFormats = { lineTension: 0.05, fill: true };
  const datasets = [
    {
      ...defaultFormats,
      label: 'Unique by day',
      data: values.map(v => v.uniqueVisits),
      pointBackgroundColor: visitColor,
      borderColor: lighterVisit,
      backgroundColor: lighterVisit
    },
    {
      ...defaultFormats,
      label: 'Visits by day',
      data: values.map(v => v.visits),
      pointBackgroundColor: uniqueColor,
      borderColor: lighterUniqueVisit,
      backgroundColor: lighterUniqueVisit
    },
  ];

  const barData = { labels: dates.map(d => d.label), datasets };
  const options = {
    spanGaps: false,
    scales: { y: { beginAtZero: true, max: maxY }, x: { grid: { display: false } } },
    plugins: {
      tooltip: {
        callbacks: {
          title: ([{ dataIndex }]: { dataIndex: number }[]) => {
            const date = dates[dataIndex].date;
            const dayOfWeek = new Date(date).toLocaleDateString('en-us', { weekday: 'long' });
            return `${dayOfWeek}, ${dateStr(date).slice(3)}`;
          }
        }
      }
    },
  }

  return (
    <>
      <Line
        data={barData}
        options={options}
      />
    </>
  );
}