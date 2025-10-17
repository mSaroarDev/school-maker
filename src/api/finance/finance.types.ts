export type TTransactions = {
  _id?: string;
  invoiceId?: string;
  category?: string | {
    _id: string;
    categoryName: string;
    type: string;
  };
  studentId?: string | {
    _id: string;
    avatar?: string;
    studentId: string;
    fullName: string;
    class: {
      _id: string;
      displayName: string;
      classValue: string;
    };
  };
  title: string;
  paidBy?: string;
  paymentMethod?: string;
  amounts: {
    title: string;
    amount: number;
  }[];
  dueDate?: string;
  transferedFrom: string;
  transferedTo: string;
  status?: string;
  remarks?: string;
  type: string;
  createdBy?: {
    _id: string;
    fullName: string;
  },
  createdAt?: string;
  updatedAt?: string;
};

export type TGetTransactionsPayload = {
  currPage: number;
  limit: number;
  search?: string;
  status?: string[];
  type?: string | string[];
  startDate?: string;
  endDate?: string;
}