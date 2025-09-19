import request from '@/api/apiRequest';
import { TBooks, TBooksGetPayload, TUpdateBooksPayload } from './books.types';

export const createBook = async (data: TBooks) => {
  const res = await request.post('/books/create', data);
  return res.data;
};

export const getBooks = async (payload: TBooksGetPayload) => {
  console.log("payload:", payload);
  const res = await request.get('/books', { params: payload });
  return res.data;
};

export const getBookById = async (id: string) => {
  const res = await request.get(`/books/${id}`);
  return res.data;
}

export const updateBook = async (payload: TUpdateBooksPayload) => {
  const res = await request.put(`/books/${payload._id}`, payload.data);
  return res.data;
}