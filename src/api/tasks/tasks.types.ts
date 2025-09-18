export type TTask = {
  _id?: string;
  instituteId?: string;
  taskName: string;
  taskFor: {
    _id: string;
    fullName: string;
    avatar?: string;
    employeeId?: string;
  }[];
  status?: "pending" | "in-progress" | "completed" | "overdue";
  isDeleted?: boolean;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}