import { useQuery } from "@tanstack/react-query";
import fetchHandler from "./fetch-handler"
import { LifetimeTotals } from "../types";

const route = '/statistics/hosts/1/lifetime-totals'
const getLifetimeTotals = (): Promise<LifetimeTotals> => fetchHandler(route);

export const useGetLifetimeTotals = () => {
  return useQuery({ queryKey: ['lifetimeTotals'], queryFn: getLifetimeTotals });
}