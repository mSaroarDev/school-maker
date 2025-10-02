import request from "../apiRequest";
import { TGetMessagesPayload, TMessage } from "./messages.types";

export const createMessage = (data: TMessage) => {
  const res = request.post("/messages", data);
  return res;
};

export const getMessages = (payload: TGetMessagesPayload) => {
  const res = request.get("/messages", {params: payload});
  return res;
};

export const getMessageById = (id: string) => {
  const res = request.get(`/messages/${id}`);
  return res;
};

export const updateMessageById = (id: string, data: Partial<TMessage>) => {
  const res = request.put(`/messages/${id}`, data);
  return res;
};