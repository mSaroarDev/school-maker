
export type TGetSalary = {
  search?: string;
  month?: string;
  year?: number;
  payStatus?: string;
  currPage: number;
  limit: number;
};

export type TSalary = {
  _id: string;
  employeeId: {
    _id: string;
    fullName: string;
    designation: string;
    avatar?: string;
    employeeId?: string;
  } | string;
  month: string;
  year: number;
  baseSalary: number;
  otherAllowance: number;
  deductions: number;
  totalSalary: number;
  payStatus: "Paid" | "Due";
  createdAt: string;
  updatedAt: string;
};