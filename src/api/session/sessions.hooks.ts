import { useQuery } from "@tanstack/react-query";
import { getAllSessions } from "./sessions.api";

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