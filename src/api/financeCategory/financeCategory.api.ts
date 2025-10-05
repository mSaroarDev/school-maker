import request from "@/api/apiRequest";

export const createFinanceCategory = async (data: { categoryName: string, type: string }) => {
  const res = await request.post('/finance-category/create', data);
  return res?.data;
};

export const getFinanceCategories = async (type: string) => {
  const res = await request.get(`/finance-category`, { params: { type } });
  return res?.data;
};

export const updateFinanceCategory = async (payload: { id: string, data: { categoryName: string } }) => {
  const res = await request.put(`/finance-category/update/${payload.id}`, payload.data);
  return res?.data;
}