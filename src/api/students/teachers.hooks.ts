import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createStudent, getAllStudents, getStudentById, updateStudent } from "./students.api";
import { TGetStudentsPayload } from "./teachers.interfaces";

export const useGetAllStudents = (payload: TGetStudentsPayload) => {
  const query = useQuery({
    queryKey: ["students", payload],
    queryFn: () => getAllStudents(payload),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
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

export const useGetStudentById = (studentId: string) => {
  const query = useQuery({
    queryKey: ["students", studentId],
    queryFn: () => getStudentById(studentId),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return query;
}