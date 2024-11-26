import { useQuery } from "@tanstack/react-query";
import fetchHandler from "./fetch-handler"
import { MonthlyVisits } from "../types";

const route = '/hosts/1/visits'
const getMonthlyViews = (): Promise<MonthlyVisits> => fetchHandler(route);

export const useGetMonthlyViews = () => {
  return useQuery({ queryKey: ['monthly-views'], queryFn: getMonthlyViews });
}