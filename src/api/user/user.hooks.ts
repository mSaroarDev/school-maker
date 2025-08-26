import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "./users.api";

export const useCreateUsers = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    }
  });

  return data;
}