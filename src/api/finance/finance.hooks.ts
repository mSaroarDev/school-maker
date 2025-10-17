import { createTransaction, getTransactionById, getTransactions, updateTransaction } from './finance.api';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TGetTransactionsPayload } from './finance.types';

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["finance"] });
    }
  });

  return data;
};

export const useGetAllTransaction = (payload: TGetTransactionsPayload) => {
  const query = useQuery({
    queryKey: ["finance", payload],
    queryFn: ()=> getTransactions(payload),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return query;
};

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["finance"] });
    }
  });

  return data;
};

export const useGetTransactionById = (id: string) => {
  const query = useQuery({
    queryKey: ["finance", id],
    queryFn: ()=> getTransactionById(id),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return query;
};