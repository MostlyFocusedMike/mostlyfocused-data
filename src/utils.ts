import { Visit } from "./types";

export const trimRoute = (route: string) => {
  if (route === '/') return 'mostlyfocused.com'
  if (route === '/pages/articles/') return '/articles'
  return route.replace('/pages/articles', '');
}

export const trimReferrer = (referrer: string) => {
  return referrer.replace(/https?:\/\/(www\.)?/, '')
}

export const dateStr = (dateString: string) => {
  const date = new Date(dateString);

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = new Date(date).toLocaleDateString('en-us', { weekday: 'long' });

  return `${dayOfWeek[0]}, ${month}/${day}`;
}

export const getListOfDaysInMonth = (monthNum: number, year = 2024) => {
  const format = (time: Date) => new Date(time).toLocaleDateString();

  const month = monthNum < 10 ? `0${monthNum}` : monthNum;
  const dayIterator = new Date(`${year}-${month}-01T00:00`);

  const dates = [format(dayIterator)];
  dayIterator.setDate(dayIterator.getDate() + 1);

  while (dayIterator.getDate() != 1) {
    dates.push(format(dayIterator));
    dayIterator.setDate(dayIterator.getDate() + 1);
  }

  return dates;
};

type DateOpt = { date: string, label: string }
type ValueObj = {
  visits: number;
  uniqueVisits: number;
  ipUuids: { [key: string]: boolean };
  timestamp: string;
}
export const getNumOfVisitsPerDay = (visits: Visit[]): [DateOpt[], ValueObj[], number] => {
  const routeHitsByDay = visits.reduce((hash: any, { timestamp, ipUuid }) => {
    const date = new Date(timestamp).toLocaleDateString();
    hash[date] ||= { visits: 0, uniqueVisits: 0, ipUuids: {}, timestamp };
    hash[date].visits += 1;

    if (!hash[date].ipUuids[ipUuid]) {
      hash[date].ipUuids[ipUuid] = true;
      hash[date].uniqueVisits += 1;
    }

    return hash
  }, {});

  // TODO: these have to be changed when you allow queries by month and year
  const currentMonth = (new Date()).getMonth() + 1;
  const currentYear = (new Date()).getFullYear();
  const datesForMonth = getListOfDaysInMonth(currentMonth, currentYear);

  const empty = { visits: 0, uniqueVisits: 0 }
  const values = datesForMonth.map(date => (routeHitsByDay[date] || empty));
  const dates = datesForMonth.map(date => ({ date, label: dateStr(date) }))
  const maxVal = Math.floor(Math.max(...values.map(v => v.visits)) * 1.25);
  const maxY = maxVal + (maxVal % 2 ? 1 : 0)

  return [dates, values, maxY];
};

// polyfill style utils
export const groupBy = <T, K extends string | number | symbol>(
  array: T[],
  keySelector: (item: T) => K
): Record<K, T[]> => {
  return array.reduce((grouped, item) => {
    const key = keySelector(item);
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(item);
    return grouped;
  }, {} as Record<K, T[]>);
}