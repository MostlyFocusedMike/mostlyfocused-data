type ReferrerTotal = {
  total: number
  referrer: string
}

type RouteTotal = {
  route: string;
  total: number;
  unique: number;
}

export type LifetimeTotals = {
  referrerTotals: ReferrerTotal[];
  routeTotals: RouteTotal[];
}
