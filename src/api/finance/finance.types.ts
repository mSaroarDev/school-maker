export type TTransactions = {
  _id?: string;
  invoiceId?: string;
  category?: string | {
    _id: string;
    categoryName: string;
    type: string;
  };
  title: string;
  paidBy?: string;
  paymentMethod?: string;
  amounts: {
    title: string;
    amount: number;
  }[];
  transferedFrom: string;
  transferedTo: string;
  status?: string;
  remarks?: string;
  type: string;
  createdAt?: string;
  updatedAt?: string;
};

export type TGetTransactionsPayload = {
  currPage: number;
  limit: number;
  search?: string;
  status?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
}