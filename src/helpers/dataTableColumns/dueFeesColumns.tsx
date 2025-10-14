import { MdMoreVert } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import { GrStreetView } from "react-icons/gr";
import { SiFreelancer } from "react-icons/si";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import RenderStatus, { StatusKey } from "@/components/_core/RenderStatus";
import { TTransactions } from "@/api/finance/finance.types";

export const getDueFeesColumns = () => [
  {
    name: "Student Name",
    cell: (row: TTransactions) => (
      <div className="flex items-center gap-1">
        <div className="flex-shrink-0 w-10 h-10 overflow-hidden rounded-full bg-slate-50 relative">
          {/* <Image src={""} alt="Avatar" fill /> */}
        </div>
        <div>
          <h3 className="font-medium">
            {typeof row?.studentId === "object" && row?.studentId !== null ? row.studentId.fullName : "N/A"}
          </h3>
          <p>{typeof row?.studentId === "object" && row?.studentId !== null ? row.studentId.studentId : "N/A"}</p>
        </div>
      </div>
    ),
  },
  {
    name: "Class",
    selector: (row: TTransactions) => typeof row?.studentId === "object" && row?.studentId !== null ? row.studentId?.class?.displayName : "N/A",
  },
  {
    name: "Description",
    selector: (row: TTransactions) => row?.remarks || "N/A",
  },
  {
    name: "Due Date",
    selector: (row: TTransactions) => row?.dueDate || "N/A",
  },
  {
    name: "Amount",
    selector: (row: TTransactions) => `৳ ${row?.amounts?.reduce((acc, curr) => acc + curr.amount, 0)}`
  },
  {
    name: "Status",
    cell: (row: TTransactions) => <RenderStatus status={row?.status as StatusKey} />,
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
            <FiEye size={20} /> View Receipt
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <GrStreetView size={20} /> Review
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <SiFreelancer size={20} /> Pay Now
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
