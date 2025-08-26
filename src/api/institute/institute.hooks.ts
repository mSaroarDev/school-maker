import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInstitute, updateInstitute } from "./institute.api";

export const useCreateInstitute = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationFn: createInstitute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["institutes"] });
    }
  });

  return data;
}

export const useUpdateInstitute = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationFn: updateInstitute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["institutes"] });
    }
  });

  return data;
}