import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSection, getAllSections } from "./sections.api";

export const useCreateSectin = () => {
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
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationFn: getAllSections,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["section"] });
    }
  });

  return data;
};