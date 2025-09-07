import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllAttendence, updateAttendence } from "./attendence.api";
import { TGetAttendencePayload } from "./attendence.types";

export const useGetAllAttendence = (payload: TGetAttendencePayload) => {
  const query = useQuery({
    queryKey: ["attendence", payload],
    queryFn: ()=> getAllAttendence(payload),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return query;
};

export const useUpdateAttendence = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationFn: updateAttendence,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendence"] });
    }
  });

  return data;
}