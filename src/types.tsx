export type LifetimeReferrerTotal = {
  total: number;
  referrer: string;
}

type LifetimeRouteTotal = {
  route: string;
  total: number;
  unique: number;
}

export type LifetimeAndMonthRouteTotal = {
  route: string;
  total: number;
  unique: number;
  monthUnique: number;
  monthTotal: number;
}

export type LifetimeAndMonthReferrerTotal = {
  referrer: string;
  total: number;
  monthTotal: number;
}

export type LifetimeTotals = {
  referrerTotals: LifetimeReferrerTotal[];
  routeTotals: LifetimeRouteTotal[];
}

export type Visit = {
  id: number;
  ipUuid: string;
  route: string;
  referrer: string;
  country: string;
  countryCode: string;
  state: string;
  timestamp: string;
}

export type MonthlyVisits = {
  total: number;
  visits: Visit[];
}
