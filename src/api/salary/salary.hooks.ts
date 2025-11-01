import { useQuery } from "@tanstack/react-query";
import { SalaryApi } from "./salary.api";
import { TGetSalary } from "./salary.types";

export const useGetSalaries = (payload: TGetSalary) => {
  console.log("payload in hook:", payload);
  
  const query = useQuery({
    queryKey: ["salary", payload],
    queryFn: () => SalaryApi.getSalaries(payload),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return query;
};