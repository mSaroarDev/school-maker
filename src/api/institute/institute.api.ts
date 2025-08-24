"use server";
import request from "../apiRequest";
import { TInstitute } from "./institue.interfaces";

export const createInstitute = async (data: TInstitute) => {
 const res = await request.post("/institute/create", data);
 return res.data;
}