import { TInstallInstituteFormData } from "@/pages/guest-pages/install/interfaces/formdataInterface";
import request from "../apiRequest";

export const createInstitute = async (data: TInstallInstituteFormData) => {
 const res = await request.post("/institute/create", data);
 return res.data;
}