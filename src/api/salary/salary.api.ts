 import request from "../apiRequest";
import { TGetSalary, TSalary } from "./salary.types";

 export const SalaryApi = {
  getSalaries: async (params?: TGetSalary) => {
    const response = await request.get("/salary", { params });
    return response.data;
  },

  getSalaryById: async (id: string) => {
    const response = await request.get(`/salary/${id}`);
    return response.data;
  },

  createSalary: async (data: TSalary) => {
    const response = await request.post("/salary", data);
    return response.data;
  },

  updateSalary: async (id: string, data: Partial<TGetSalary>) => {
    const response = await request.put(`/salary/${id}`, data);
    return response.data;
  },
 }