import request from "../apiRequest"
import { TGetTeacherPayload, TTeacherPayload } from "./teachers.interfaces";

export const getAllTeachers = async (payload: TGetTeacherPayload) => {
  const res = await request.get("/teachers", { params: payload });
  return res?.data?.data;
};

export const createTeacher = async (payload: TTeacherPayload) => {
  const res = await request.post("/teachers/create", payload);
  return res?.data;
}