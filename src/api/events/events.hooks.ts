import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createEvent, getAllEvents, getEventById, updateEvent } from "./events.api";
import { TGetAllEventsPayload } from "./events.types";

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event"] });
    }
  });

  return data;
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event"] });
    }
  });

  return data;
};

export const useGetAllEvents = (payload: TGetAllEventsPayload) => {
   const query = useQuery({
    queryKey: ["class"],
    queryFn: ()=> getAllEvents(payload),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return query;
};

export const useGetEventById = (eventId: string) => {
  const query = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getEventById(eventId),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: !!eventId,
  });

  return query;
};