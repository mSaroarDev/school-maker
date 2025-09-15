import { setEvents, addEvent } from "@/redux/features/calender/calender.slice";
import { useAppDispatch } from "@/redux/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createEvent, getAllEvents, getEventById, updateEvent } from "./events.api";
import { TGetAllEventsPayload, TEventResponse } from "./events.types";
import { useEffect } from "react";

export const useCreateEvent = () => {
  const data = useMutation({
    mutationFn: createEvent,
  });

  return data;
};

export const useUpdateEvent = () => {
  const dispatch = useAppDispatch();
  const data = useMutation({
    mutationFn: updateEvent,
    onSuccess: (res) => {
      if (!res?.data) return;
      dispatch(addEvent(res as TEventResponse));
    },
  });

  return data;
};

export const useGetAllEvents = (payload: TGetAllEventsPayload) => {
  const dispatch = useAppDispatch();
  const query = useQuery({
    queryKey: ["event"],
    queryFn: () => getAllEvents(payload),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
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
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!eventId,
  });

  return query;
};
