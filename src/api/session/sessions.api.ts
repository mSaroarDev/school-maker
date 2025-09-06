import request from "../apiRequest";
import { TCreateSessionPayload, TSessionsFullResponse } from "./sessions.types";

export const getAllSessions = async (): Promise<TSessionsFullResponse> => {
  const res = await request.get("/sessions");
  return res.data;
};

export const createSession = async (payload: TCreateSessionPayload) => {
  const res = await request.post("/sessions/create", payload);
  return res.data;
}