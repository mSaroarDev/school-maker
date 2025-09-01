import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, updateProfile, userLogn } from "./users.api";

export const useCreateUsers = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    }
  });

  return data;
};

export const useUserLogin = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationFn: userLogn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    }
  });

  return data;
};

export const useUpdatProfile = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    }
  });

  return data;
};