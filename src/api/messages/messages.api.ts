import request from "../apiRequest";
import { TGetMessagesPayload, TMessage } from "./messages.types";

export const createMessage = async (data: TMessage) => {
  const res = await request.post("/messages/create", data);
  return res?.data;
};

export const getMessages = async (payload: TGetMessagesPayload) => {
  const res = await request.get("/messages", {params: payload});
  return res?.data;
};

export const getMessageById = async (id: string) => {
  const res = await request.get(`/messages/${id}`);
  return res?.data;
};

export const updateMessageById = async (id: string, data: Partial<TMessage>) => {
  const res = await request.put(`/messages/${id}`, data);
  return res?.data;
};