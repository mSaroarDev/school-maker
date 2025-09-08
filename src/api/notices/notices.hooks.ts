import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createNotice, getAllNotices, getNoticeById, updateNotice } from "./notices.api";
import { TGetNoticesPayload } from "./notices.types";

export const useCreateNotice = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationFn: createNotice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notice"] });
    }
  });

  return data;
};

export const useUpdateNotice = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationFn: updateNotice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notice"] });
    }
  });

  return data;
};

export const useGetAllNotice = (payload: TGetNoticesPayload) => {
  const query = useQuery({
    queryKey: ["notice", payload],
    queryFn: () => getAllNotices(payload),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return query;
};

export const useGetNoticeById = (id: string) => {
  const query = useQuery({
    queryKey: ["notice", id],
    queryFn: () => getNoticeById(id),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return query;
}