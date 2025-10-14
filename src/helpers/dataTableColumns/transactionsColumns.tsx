import { TTransactions } from "@/api/finance/finance.types";
import RenderStatus, { StatusKey } from "@/components/_core/RenderStatus";
import moment from "moment";

export const getFinanceCategories = () => [
  {
    name: "Invoice ID",
    selector: (row: TTransactions) => row?.invoiceId || "N/A"
  },
  {
    name: "Payer",
    selector: (row: TTransactions) => row?.transferedFrom || "N/A"
  },
  {
    name: "Date",
    selector: (row: TTransactions) => moment(row?.updatedAt).format("DD MMM, YYYY") || "N/A"
  },
  {
    name: "Category",
    selector: (row: TTransactions) =>
      typeof row?.category === "object" && row?.category !== null
        ? row.category.categoryName
        : "N/A"
  },
  {
    name: "Paid From",
    selector: (row: TTransactions) => row?.transferedFrom || "N/A"
  },
  {
    name: "Paid to",
    selector: (row: TTransactions) => row?.transferedTo || "N/A"
  },
  {
    name: "Amount",
    selector: (row: TTransactions) => `৳ ${row?.amounts?.reduce((acc, curr) => acc + curr.amount, 0)}`
  },
  {
    name: "Status",
    width: "140px",
    cell: (row: TTransactions) => <RenderStatus status={row?.status as StatusKey} />
  }
];