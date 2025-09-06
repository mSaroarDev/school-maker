import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSection, getAllSections } from "./sections.api";

export const useCreateSection = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationFn: createSection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["section"] });
    }
  });

  return data;
};

export const useGetAllSections = () => {
  const query = useQuery({
    queryKey: ["section"],
    queryFn: getAllSections,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return query;
};