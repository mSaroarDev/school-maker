import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createStudent, getAllStudents, getStudentById, updateStudent } from "./students.api";
import { TGetStudentById, TGetStudentsPayload } from "./students.interfaces";

export const useGetAllStudents = (payload: TGetStudentsPayload) => {
  const query = useQuery({
    queryKey: ["students", payload],
    queryFn: () => getAllStudents(payload),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: payload?.enabled ?? true,
  });

  return query;
};

export const useCreateStudent = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    }
  });

  return data;
};

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: updateStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    }
  });

  return res;
};

export const useGetStudentById = (payload: TGetStudentById) => {
  const query = useQuery({
    queryKey: ["students", payload],
    queryFn: () => getStudentById(payload),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: payload?.options?.enabled ?? false,
  });

  return query;
}