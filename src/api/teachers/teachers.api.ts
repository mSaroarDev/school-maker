import request from "../apiRequest"
import { TGetTeacherPayload } from "./teachers.interfaces";

export const getAllTeachers = async (payload: TGetTeacherPayload) => {
  const res = await request.get("/teachers", { params: payload });
  return res?.data?.data;
};