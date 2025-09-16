import request from "../apiRequest";

export const getTasks = async () => {
  const res = await request.get("/tasks");
  return res.data;
};