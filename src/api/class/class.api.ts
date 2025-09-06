import request from "../apiRequest";
import { TClassesFullResponse, TCreateClassPayload } from "./class.interfaces";

export const getAllClasses = async (): Promise<TClassesFullResponse> => {
  const res = await request.get("/classes");
  return res.data;
};

export const createClass = async (payload: TCreateClassPayload) => {
  const res = await request.post("/classes/create", payload);
  return res.data;
}