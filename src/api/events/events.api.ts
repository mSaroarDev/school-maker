import request from "@/api/apiRequest";
import { TCreateEventPayload, TEventUpdatePayload, TGetAllEventsPayload } from "./events.types";

export const createEvent = async (data: TCreateEventPayload) => {
  const res = await request.post("/events/create", data);
  return res.data;
};

export const updateEvent = async (payload: TEventUpdatePayload) => {
  const res = await request.put(`/events/update/${payload.eventId}`, payload.data);
  return res.data;
};

export const getAllEvents = async (payload: TGetAllEventsPayload) => {
  const res = await request.get("/events", { params: payload });
  return res.data;
};

export const getEventById = async (eventId: string) => {
  const res = await request.get(`/events/${eventId}`);
  return res.data;
}