import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTeacher, getAllTeachers } from "./teachers.api";
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
};

export const useCreateTeacher = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationFn: createTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    }
  });

  return data;
}