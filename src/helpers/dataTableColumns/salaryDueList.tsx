import { TSalary } from "@/api/salary/salary.types";
import Avatar from "@/components/_core/Avatar";
import RenderStatus from "@/components/_core/RenderStatus";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { BiSolidEdit } from "react-icons/bi";
import { FiEye } from "react-icons/fi";
import { MdMoreVert } from "react-icons/md";

export const salaryDueListColumns = (setShowUpdateModal?: (val: boolean) => void) => [
  {
    name: "Sl.",
    width: "50px",
    cell: (_: TSalary, index: number) => index + 1,
  },
  {
    name: "Employee Name",
    cell: (row: TSalary) => (
      <div className="flex items-center gap-3">
        <Avatar 
          fullName={typeof row?.employeeId === "object" && typeof row?.employeeId !== null ? row?.employeeId?.fullName : "N/A"}
          size={40}
          avatar={typeof row?.employeeId === "object" && typeof row?.employeeId !== null ? row?.employeeId?.avatar : "N/A"}
        />
        <div>
          <h4 className="font-medium mb-0.5">
            {typeof row?.employeeId === "object" && typeof row?.employeeId !== null ? row?.employeeId?.fullName : "N/A"}
          </h4>
          <p>
            EId: {typeof row?.employeeId === "object" && typeof row?.employeeId !== null ? row?.employeeId?.employeeId : "N/A"}
          </p>
        </div>
      </div>
    )
  },
  {
    name: "Designation",
    selector: (row: TSalary) => typeof row?.employeeId === "object" && typeof row?.employeeId !== null ? row?.employeeId?.designation : "N/A",
  },
  {
    name: "Base Salary",
    cell: (_: TSalary) => (
      <div>৳50,000</div>
    ),
  },
  {
    name: "Other Allowance",
    cell: (_: TSalary) => (
      <div>৳5,000</div>
    ),
  },
  {
    name: "Total",
    cell: (_: TSalary) => (
      <div>{`৳${(50000 + 5000).toLocaleString()}`}</div>
    ),
  },
  {
    name: "Month",
    cell: (_: TSalary) => (
      <div>January - 25</div>
    ),
  },
  {
    name: "Status",
    cell: (_: TSalary) => <RenderStatus status="due" />,
  },
  {
    name: "Action",
    width: "100px",
    cell: (row: TSalary) => (
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
            onClick={() => setShowUpdateModal?.(true)}
          >
            <BiSolidEdit size={18} /> Update Status
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
