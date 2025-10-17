import { TTransactions } from "@/api/finance/finance.types";
import Avatar from "@/components/_core/Avatar";
import RenderStatus, { StatusKey } from "@/components/_core/RenderStatus";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FiEye } from "react-icons/fi";
import { GrStreetView } from "react-icons/gr";
import { MdMoreVert } from "react-icons/md";

export const getRecentTransactionColumns = () => [
  {
    name: "Student Name",
    cell: (row: TTransactions) => (
      <div className="flex items-center gap-1">
        <div className="flex-shrink-0 w-10 h-10 overflow-hidden rounded-full bg-slate-50 relative">
          <Avatar
            fullName={typeof row?.studentId === "object" && typeof row?.studentId !== null ? row?.studentId?.fullName : "N/A"}
            avatar={typeof row?.studentId === "object" && typeof row?.studentId !== null ? row?.studentId?.avatar : "N/A"}
            size={40}
          />
        </div>
        <div>
          <h3 className="font-medium">{typeof row?.studentId === "object" && typeof row?.studentId !== null ? row?.studentId?.fullName : "N/A"}</h3>
          <p>{typeof row?.studentId === "object" && typeof row?.studentId !== null ? row?.studentId?.studentId : "N/A"}</p>
        </div>
      </div>
    )
  },
  {
    name: "Class",
    selector: (row: TTransactions) => typeof row?.studentId === "object" && typeof row?.studentId !== null ? row?.studentId?.class?.displayName : "N/A"
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
    name: "Invoice Id",
    selector: (row: TTransactions) => row?.invoiceId || "N/A"
  },
  {
    name: "Amount",
    selector: (row: TTransactions) => row?.amounts?.reduce((acc, curr) => acc + curr.amount, 0) || 0  
  },
  {
    name: "Status",
    cell: (row: TTransactions) => <RenderStatus status={row?.status as StatusKey} />
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
            onClick={() => window.open(`/finance/reciept/${row?._id}`, "_blank")}
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