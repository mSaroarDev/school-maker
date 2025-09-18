import request from "../apiRequest";
import { TGetStudentById, TGetStudentsPayload, TStudentsCreatePayload, TUpdateStudentPayload } from "./students.interfaces";

export const getAllStudents = async (payload: TGetStudentsPayload) => {
  const res = await request.get("/students", { params: payload });
  return res?.data;
};

export const createStudent = async (payload: TStudentsCreatePayload) => {
  const res = await request.post("/students/create", payload);
  return res?.data;
};

export const updateStudent = async (payload: TUpdateStudentPayload) => {
  const res = await request.put(`/students/update/${payload.studentId}`, payload.data);
  return res?.data;
};

export const getStudentById = async (payload: TGetStudentById) => {
  const res = await request.get(`/students/${payload?.studentId}`);
  return res?.data;
};