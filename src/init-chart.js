import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  Filler,
} from 'chart.js';

ChartJS.register(
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);
// looks like we only need to register once for the whole app

// set the Chart default background color to #333 for dark background
ChartJS.defaults.borderColor = '#555'
ChartJS.defaults.backgroundColor = '#FFF';
ChartJS.defaults.color = 'white';
