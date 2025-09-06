import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSession, getAllSessions } from "./sessions.api";

export const useGetAllSessions = () => {
  const query = useQuery({
    queryKey: ["session"],
    queryFn: getAllSessions,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return query;
};

export const useCreateSession = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });

  return mutation;
}