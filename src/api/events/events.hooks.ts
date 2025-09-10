import { setEvents } from "@/redux/features/calender/calender.slice";
import { useAppDispatch } from "@/redux/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createEvent, getAllEvents, getEventById, updateEvent } from "./events.api";
import { TGetAllEventsPayload } from "./events.types";
import { useEffect } from "react";

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
  const dispatch = useAppDispatch();
  const query = useQuery({
    queryKey: ["class"],
    queryFn: () => getAllEvents(payload),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.isSuccess && query.data?.data) {
      dispatch(setEvents(query.data.data));
    }
  }, [query.isSuccess, query.data, dispatch]);

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