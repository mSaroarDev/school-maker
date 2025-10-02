import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClass, getAllClasses } from "./class.api";

export const useGetAllClasses = () => {
  const query = useQuery({
    queryKey: ["class"],
    queryFn: getAllClasses,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return query;
};

export const useCreateClass = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationFn: createClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["class"] });
    }
  });

  return data;
};