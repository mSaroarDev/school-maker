import request from "../apiRequest";
import { TGetTransactionsPayload, TTransactions } from "./finance.types";

export const createTransaction = async (data: TTransactions) => {
  const res = await request.post("/finance/create", data);
  return res.data;
};

export const getTransactions = async (payload: TGetTransactionsPayload) => {
  const res = await request.get(`/finance`, {params: payload});
  return res.data;
};

export const updateTransaction = async (payload: {_id: string, data: TTransactions}) => {
  const {_id, ...data} = payload;
  const res = await request.put(`/finance/update/${_id}`, data);
  return res.data;
};