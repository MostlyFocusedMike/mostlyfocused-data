import { Line } from "react-chartjs-2";
import { dateStr, getNumOfVisitsPerDay } from "../../utils";
import { Visit } from "../../types";

const visitColor = 'rgba(64, 224, 208, 1)';
const lighterVisit = 'rgba(64, 224, 208, 0.4)';
const uniqueColor = 'rgba(147, 51, 234, 1)';
const lighterUniqueVisit = 'rgba(147, 51, 234, .4)';

type Props = { visits: Visit[]; showUnique?: boolean; }

export default function VisitsByRouteChart({ visits, showUnique = true }: Props) {
  const [dates, values, maxY] = getNumOfVisitsPerDay(visits);

  const titleCallback = ([{ dataIndex }]: { dataIndex: number }[]) => {
    const date = dates[dataIndex].date;
    const dayOfWeek = new Date(date).toLocaleDateString('en-us', { weekday: 'long' });
    return `${dayOfWeek}, ${dateStr(date).slice(3)}`;
  }

  const defaultFormats = { lineTension: 0.05, fill: true };
  const datasets = [
    {
      ...defaultFormats,
      label: 'Total Visits by day',
      data: values.map(v => v.visits),
      pointBackgroundColor: uniqueColor,
      borderColor: lighterUniqueVisit,
      backgroundColor: lighterUniqueVisit
    },
  ];

  if (showUnique) datasets.unshift({
    ...defaultFormats,
    label: 'Unique by day',
    data: values.map(v => v.uniqueVisits),
    pointBackgroundColor: visitColor,
    borderColor: lighterVisit,
    backgroundColor: lighterVisit
  })

  const scales = { y: { beginAtZero: true, max: maxY }, x: { grid: { display: false } }, }
  const plugins = { tooltip: { callbacks: { title: titleCallback } } };
  const labels = dates.map(d => d.label);

  return (
    <>
      <Line
        data={{ labels, datasets }}
        options={{ spanGaps: false, scales, plugins }} />
    </>
  );
}