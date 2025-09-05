import request from "../apiRequest";
import { TGetStudentsPayload, TStudentByIdPayload, TStudents } from "./teachers.interfaces";

export const getAllStudents = async (payload: TGetStudentsPayload) => {
  const res = await request.get("/students", { params: payload });
  return res?.data;
};

export const createStudent = async (payload: TStudents) => {
  const res = await request.post("/students/create", payload);
  return res?.data;
};

export const updateStudent = async (payload: TStudentByIdPayload) => {
  const res = await request.put(`/students/update/${payload.studentId}`, payload.data);
  return res?.data;
};

export const getStudentById = async (studentId: string) => {
  const res = await request.get(`/students/${studentId}`);
  return res?.data;
};