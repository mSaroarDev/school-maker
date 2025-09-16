export type TTask = {
  _id?: string;
  instituteId?: string;
  title: string;
  taskFor: string[];
  status?: "pending" | "in-progress" | "completed" | "overdue";
  isDeleted?: boolean;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}