import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMessage, getMessageById, getMessages, updateMessageById } from "./messages.api";
import { TGetMessagesPayload } from "./messages.types";

export const useCreateMessage = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationFn: createMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["message"] });
    }
  });

  return data;
};

export const useGetMessages = (payload: TGetMessagesPayload) => {
  const query = useQuery({
    queryKey: ["message", payload, payload?.userId],
    queryFn: ()=> getMessages(payload),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return query;
};

export const useGetMessageById = (id: string) => {
  const query = useQuery({
    queryKey: ["message", id],
    queryFn: ()=> getMessageById(id),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return query; 
};

export const useUpdateMessage = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationFn: updateMessageById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["message"] });
    }
  });

  return data;
};