import request from "../apiRequest";
import { TSessionsFullResponse } from "./sessions.types";

export const getAllSessions = async (): Promise<TSessionsFullResponse> => {
  const res = await request.get("/sessions");
  return res.data;
};