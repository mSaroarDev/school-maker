import { useQuery } from "@tanstack/react-query";
import { getAllAttendence } from "./attendence.api";

export const useGetAllAttendence = (payload) => {
  console.log("useGetAllAttendence called with payload:", payload);
  const query = useQuery({
    queryKey: ["attendence", payload],
    queryFn: ()=> getAllAttendence(payload),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return query;
};