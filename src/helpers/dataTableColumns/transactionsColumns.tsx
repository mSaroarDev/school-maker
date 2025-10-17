import { TTransactions } from "@/api/finance/finance.types";
import RenderStatus, { StatusKey } from "@/components/_core/RenderStatus";
import moment from "moment";

export const getFinanceCategories = () => [
  {
    name: "Invoice ID",
    cell: (row: TTransactions) => (
      <div className="flex items-center gap-3">
        <div className={`${row?.type === "income" ? "bg-green-600" : "bg-red-500"} h-2 w-2 grid place-items-center text-white rounded-full`}>
        </div>

        <a href={`/reciept/${row?._id}`} target="_blank" className="text-primary-600 underline">
          {row?.invoiceId || "N/A"}
        </a>
      </div>
    )
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
    cell: (row: TTransactions) => (
      <span className={row?.type === "income" ? "text-green-600" : "text-red-500"}>
        {row?.type === "income" ? "+" : "-"}{" "}
        ৳{row?.amounts?.reduce((acc, curr) => acc + curr.amount, 0) || 0}
      </span>
    )
  },
  {
    name: "Status",
    width: "140px",
    cell: (row: TTransactions) => <RenderStatus status={row?.status as StatusKey} />
  },
  {
    name: "Entered By",
    width: "130px",
    cell: (row: TTransactions) => row?.createdBy?.fullName?.split(" ").map((n) => n[0]).join("") || "N/A"
  },
];