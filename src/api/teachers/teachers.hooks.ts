import { useQuery } from "@tanstack/react-query";
import { getAllTeachers } from "./teachers.api";
import { TGetTeacherPayload } from "./teachers.interfaces";

export const useGetAllTeachers = (payload: TGetTeacherPayload) => {
  const query = useQuery({
    queryKey: ["teachers", payload],
    queryFn: ()=> getAllTeachers(payload),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return query;
}