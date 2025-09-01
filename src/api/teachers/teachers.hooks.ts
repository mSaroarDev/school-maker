import { useQuery } from "@tanstack/react-query";
import { getAllTeachers } from "./teachers.api";

export const useGetAllTeachers = () => {
  const query = useQuery({
    queryKey: ["teachers"],
    queryFn: getAllTeachers,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return query;
}