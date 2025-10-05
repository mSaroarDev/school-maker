import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFinanceCategory, getFinanceCategories, updateFinanceCategory } from "./financeCategory.api";

export const useCreateFinanceCategory = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationFn: createFinanceCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["finance-category"] });
    }
  });

  return data;
};

export const useGetFinanceCategories = (type: string) => {
  const query = useQuery({
    queryKey: ["finance-category", type],
    queryFn: () => getFinanceCategories(type),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return query;
};

export const useUpdateFinanceCategory = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationFn: updateFinanceCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["finance-category"] });
    }
  });

  return data;
};
