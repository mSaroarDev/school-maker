import { TSalary } from "@/api/salary/salary.types";
import Avatar from "@/components/_core/Avatar";
import RenderStatus, { StatusKey } from "@/components/_core/RenderStatus";
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

type TAmount = {
  salaryType?: string;
  amount?: string;
  effectedFrom?: string | null;
}

const getAmounts = (row: TSalary) => {
  const basicSalary = row?.salaryAmounts?.find((item: TAmount) => item.salaryType === 'Basic');
  const otherAllowance = row?.salaryAmounts?.filter((item: TAmount) => item.salaryType !== 'Basic');

  const totalOtherAllowance = otherAllowance?.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
  const total = (Number(basicSalary?.amount || 0) + totalOtherAllowance);

  return {
    basicSalary,
    totalOtherAllowance,
    total,
  };
}

export const salaryDueListColumns = (
  setShowUpdateModal?: (val: boolean) => void,
  currPage: number = 1,
  limit: number = 10,
) => [
  {
    name: "Sl.",
    width: "70px",
    cell: (_: TSalary, index: number) => `#${(currPage - 1) * limit + index + 1}`,
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
    cell: (row: TSalary) => (
      <div>
        {getAmounts(row).basicSalary ? `৳${Number(getAmounts(row).basicSalary?.amount || 0).toLocaleString()}` : "-"}
      </div>
    ),
  },
  {
    name: "Other Allowance",
    cell: (row: TSalary) => (
      <div>
        {getAmounts(row).totalOtherAllowance ? `৳${Number(getAmounts(row).totalOtherAllowance || 0).toLocaleString()}` : "-"}
      </div>
    ),
  },
  {
    name: "Total",
    cell: (_: TSalary) => (
      <div>
        {getAmounts(_).total ? `৳${Number(getAmounts(_).total || 0).toLocaleString()}` : "-"}
      </div>
    ),
  },
  {
    name: "Month",
    cell: (row: TSalary) => `${row?.month} - ${row?.year}`,
  },
  {
    name: "Status",
    cell: (row: TSalary) => <RenderStatus status={row?.payStatus as StatusKey} />,
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
