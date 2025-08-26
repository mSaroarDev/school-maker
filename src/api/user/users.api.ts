import { TInstallAdminFormData } from "@/pages/guest-pages/install/interfaces/formdataInterface";
import request from "../apiRequest";

export const createUser = async (data: TInstallAdminFormData) => {
  const res = await request.post("/users/create", data);
  return res.data;
};

export const userLogn = async (data: { email: string; password: string }) => {
  const res = await request.post("/users/login", data);
  return res.data;
};