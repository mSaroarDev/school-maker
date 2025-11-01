import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SalaryApi } from "./salary.api";
import { TGetSalary } from "./salary.types";

export const useGetSalaries = (payload: TGetSalary) => {

  const query = useQuery({
    queryKey: ["salary", payload],
    queryFn: () => SalaryApi.getSalaries(payload),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return query;
};

export const useUpdateStatus = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationFn: SalaryApi.updateSalary,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["salary"] });
    }
  });

  return data;
}