import request from "../apiRequest";
import { TClassesFullResponse } from "./class.interfaces";

export const getAllClasses = async (): Promise<TClassesFullResponse> => {
  const res = await request.get("/classes");
  return res.data;
};