import { useMutation, useQuery } from "@tanstack/react-query"
import { createTask, getTasks } from "./tasks.api"
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import { setTasks } from "@/redux/features/tasks/tasks.slice";

export const useCreateTask = () => {
  const data = useMutation({
    mutationFn: createTask,
  });
  return data;
};

export const useGetTasks = () => {
  const dispatch = useAppDispatch();

  const query = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.isSuccess) {
      dispatch(setTasks(query.data));
    }
  }, [dispatch, query.data, query.isSuccess]);

  return query;
};