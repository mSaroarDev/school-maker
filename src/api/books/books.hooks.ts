import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBook, getBooks } from "./books.api";
import { useEffect } from "react";

export const useGetAllBooks = (payload) => {
  const query = useQuery({
    queryKey: ["books", payload],
    queryFn: getBooks,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    // redux action
  }, [payload]);

  return query;
};

export const useCreateClass = () => {
  const data = useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      // Invalidate and refetch
    }
  });

  return data;
}