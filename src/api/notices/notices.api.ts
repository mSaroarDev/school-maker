import request from "../apiRequest"
import { TGetNoticesPayload, TNoticeCreatePayload, TNoticeUpdatePayload } from "./notices.types";

export const createNotice = async (data: TNoticeCreatePayload) => {
  const res = await request.post('/notices/create', data);
  return res.data;
};

export const updateNotice = async (pyaload: TNoticeUpdatePayload) => {
  const res = await request.put(`/notices/update/${pyaload?.id}`, pyaload?.data);
  return res.data;
};

export const getAllNotices = async (payload: TGetNoticesPayload) => {
  const res = await request.get('/notices', { params: payload });
  return res.data;
}; 

export const getNoticeById = async (id: string) => {
  const res = await request.get(`/notices/${id}`);
  return res.data;
};