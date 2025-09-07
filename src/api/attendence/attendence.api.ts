import request from "../apiRequest"
import { TAttendenceResponse, TGetAttendencePayload, TUpdateAttendencePayload } from "./attendence.types";

export const getAllAttendence = async (payload: TGetAttendencePayload): Promise<TAttendenceResponse> => {
  const res = await request.get("/attendence", { params: payload });
  return res.data;
};

export const updateAttendence = async (payload: TUpdateAttendencePayload) => {
  const res = await request.put("/attendence/update", payload);
  return res.data;
};