import { TTransactions } from "@/api/finance/finance.types";
import RenderStatus, { StatusKey } from "@/components/_core/RenderStatus";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FiEye } from "react-icons/fi";
import { GrStreetView } from "react-icons/gr";
import { MdMoreVert } from "react-icons/md";

export const getRecentTransactionColumns = () => [
  {
    name: "Invoice Id",
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
    name: "Paid For",
    selector: (row: TTransactions) => row?.title || "N/A"
  },
  // {
  //   name: "Category",
  //   selector: (row: TTransactions) => typeof row?.category === "object" && typeof row?.category !== null ? row?.category?.categoryName : "N/A"
  // },
  {
    name: "Payment Method",
    selector: (row: TTransactions) => row?.paymentMethod || "N/A"
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
    cell: (row: TTransactions) => <RenderStatus status={row?.status as StatusKey} />
  },
  {
    name: "Entered By",
    cell: (row: TTransactions) => row?.createdBy?.fullName?.split(" ").map((n) => n[0]).join("") || "N/A"
  },
  {
    name: "Action",
    width: "100px",
    cell: (row: TTransactions) => (
      <DropdownMenu>
        <DropdownMenuTrigger className="more-action-button">
          <MdMoreVert size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => window.open(`/reciept/${row?._id}`, "_blank")}
          >
            <FiEye size={18} /> View Reciept
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
          // onClick={() => setShowReviewModal(true)}
          >
            <GrStreetView size={18} /> Review
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
];