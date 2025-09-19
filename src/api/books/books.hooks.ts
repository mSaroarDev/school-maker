import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBook, getBookById, getBooks, updateBook } from "./books.api";
import { useEffect } from "react";
import { TBooksGetPayload } from "./books.types";
import { useAppDispatch } from "@/redux/hooks";
import { addBook, setBooks, setTotalCounts, updateBook as editBook } from "@/redux/features/books/books.slice";

export const useGetAllBooks = (payload: TBooksGetPayload) => {
  const query = useQuery({
    queryKey: ["books", payload],
    queryFn: () => getBooks(payload),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setBooks(query.data?.data || []));
    dispatch(setTotalCounts(query.data?.totalResults || 0));
  }, [query.data, dispatch]);

  return query;
};

export const useCreateBooks = () => {
  const data = useMutation({
    mutationFn: createBook,
  });

  return data;
};

export const useUpdateBook = () => {
  const dispatch = useAppDispatch();

  const data = useMutation({
    mutationFn: updateBook,
    onSuccess: () => {
      dispatch(editBook(data.data));
    }
  });

  return data;
};

export const useGetBookById = (id: string) => {
  const query = useQuery({
    queryKey: ["books", id],
    queryFn: () => getBookById(id),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return query;
};
