import { useQuery } from "@tanstack/react-query";
import { getAllClasses } from "./class.api";

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