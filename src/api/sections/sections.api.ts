import request from "../apiRequest";
import { TSection } from "./sections.types";

export const getAllSections = async () => {
  const res = await request.get(`/sections`);
  return res.data;
};

export const createSection = async (payload: TSection) => {
  const res = await request.post('/sections/create', payload);
  return res.data;
};