import { useQuery } from "@tanstack/react-query";
import fetchHandler from "./fetch-handler"

const route = '/statistics/hosts/1/lifetime-totals'
const getLifetimeTotals = () => fetchHandler(route);

export const useGetLifetimeTotals = () => {
  const opts = { queryKey: ['lifetimeTotals'], queryFn: getLifetimeTotals };
  return useQuery(opts);
}