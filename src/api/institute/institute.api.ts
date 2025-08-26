import { TInstallInstituteFormData, TUpdateInstituteFormData } from "@/pages/guest-pages/install/interfaces/formdataInterface";
import request from "../apiRequest";

export const createInstitute = async (data: TInstallInstituteFormData) => {
 const res = await request.post("/institute/create", data);
 return res.data;
};

export const updateInstitute = async (data: Partial<TUpdateInstituteFormData>) => {
  const res = await request.put("/institute/update", data);
  return res.data;
}