import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTeacher, getAllTeachers, getTeacherById, updateTeacher } from "./teachers.api";
import { TGetTeacherById, TGetTeacherPayload } from "./teachers.interfaces";

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
};

export const useGetTeacherById = ({
  teacherId,
  options
}: TGetTeacherById) => {
  const query = useQuery({
    queryKey: ["teachers", teacherId],
    queryFn: ()=> getTeacherById(teacherId),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: options.enabled
  });

  return query;
};

export const useUpdateTeacher = () => {
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: updateTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    }
  });

  return res;
};