export type TGetSalary = {
  search?: string;
  month?: string;
  year?: number;
  payStatus?: "Paid" | "Due" | string;
  currPage: number;
  limit: number;
};

export type TSalary = {
  _id: string;
  instituteId: string;
  employeeId: {
    _id: string;
    fullName: string;
    designation: string;
    avatar?: string;
    employeeId?: string;
    email?: string;
    salaryHistory?: {
      salaryType?: string;
      amount?: string;
      effectedFrom?: string | null;
      _id: string;
    }[];
  } | string;
  invoiceId: string;
  month: string;
  year: number;
  salaryAmounts: {
    salaryType?: string;
    amount?: string;
    effectedFrom?: string | null;
    _id: string;
  }[];
  payStatus: "Paid" | "Due" | string;
  paymentMethod?: string;
  transferedFrom?: string;
  transferedTo?: string;
  remarks?: string;
  createdAt: string;
  updatedAt: string;
};
