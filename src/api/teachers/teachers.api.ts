import request from "../apiRequest"

export const getAllTeachers = async () => {
  const res = await request.get("/teachers")
  return res?.data?.data;
};