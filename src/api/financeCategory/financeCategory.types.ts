export type TFinanceCategory = {
  _id?: string;
  categoryName: string;
  type: "income" | "expense";
  instituteId?: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}