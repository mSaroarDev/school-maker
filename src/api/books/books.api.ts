import request from '@/api/apiRequest';

export const createBook = async (data: any) => {
  const res = await request.post('/books/create', data);
  return res.data;
};

export const getBooks = async (params: any) => {
  const res = await request.get('/books', { params });
  return res.data;
};

export const getBookById = async (id: string) => {
  const res = await request.get(`/books/${id}`);
  return res.data;
}

export const updateBook = async (payload) => {
  const res = await request.put(`/books/${payload._id}`, payload.data);
  return res.data;
}