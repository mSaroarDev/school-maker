import request from "../apiRequest";
import { TTask } from "./tasks.types";

export const getTasks = async () => {
  const res = await request.get("/tasks");
  return res.data;
};

export const createTask = async (task: TTask) => {
  const res = await request.post("/tasks/create", task);
  return res.data;
};

export const updateTask = async (payload: { _id: string, data: Partial<TTask> }) => {
  const res = await request.put(`/tasks/update/${payload._id}`, payload.data);
  return res.data;
};