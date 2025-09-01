import { TInstallAdminFormData } from "@/pages/guest-pages/install/interfaces/formdataInterface";
import request from "../apiRequest";
import { TUpdateUserPayload } from "./user.interfaces";

export const createUser = async (data: TInstallAdminFormData) => {
  const res = await request.post("/users/create", data);
  return res.data;
};

export const userLogn = async (data: { email: string; password: string }) => {
  const res = await request.post("/users/login", data);
  return res.data;
};

export const updateProfile = async (data: TUpdateUserPayload) => {
  const res = await request.put("/users/update-profile", data);
  return res.data;
}