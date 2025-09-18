import request from "../apiRequest";
import { TGetTeacherPayload, TTeacherPayload } from "./teachers.interfaces";

export const getAllTeachers = async (payload: TGetTeacherPayload) => {
  const res = await request.get("/teachers", { params: payload });
  return res?.data?.data;
};

export const createTeacher = async (payload: TTeacherPayload) => {
  const res = await request.post("/teachers/create", payload);
  return res?.data;
};

export const getTeacherById = async (teacherId: string) => {
  const res = await request.get(`/teachers/${teacherId}`);
  return res?.data;
};

export const updateTeacher = async (payload: {teacherId: string, data: Partial<TTeacherPayload>}) => {
  const res = await request.put(`/teachers/update/${payload.teacherId}`, payload.data);
  return res?.data;
}