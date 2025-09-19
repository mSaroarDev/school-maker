export type TBooks = {
  _id?: string;
  instituteId?: string;
  bookId: string;
  bookName: string;
  writer: string;
  coverImage: string | null;
  subject: string;
  classes: string[];
  status?: "available" | "unavailable" | "reserved" | "checked out";
  createdBy?: string | null;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type TBooksGetPayload = {
  search?: string;
  currPage?: number;
  limit?: number;
  status?: "available" | "unavailable" | "reserved" | "checked out";
  subject?: string;
  classes?: string;
};

export type TUpdateBooksPayload = {
  _id: string;
  data: Partial<TBooks>;
};