'use client';
import CustomDataTable from "@/components/_core/CustomDataTable";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RenderStatus from "@/components/_core/RenderStatus";
import { MdMoreVert } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import { GrStreetView } from "react-icons/gr";

const DueFees = () => {

  const columns = [
    {
      name: "Student Name",
      cell: (row) => (
        <div className="flex items-center gap-1">
          <div className="flex-shrink-0 w-10 h-10 overflow-hidden rounded-full bg-slate-50 relative">
            <Image
              src={""}
              alt="Avatar"
              fill
            />
          </div>
          <div>
            <h3 className="font-medium">{row?.studentName}</h3>
            <p>{row?.studentId}</p>
          </div>
        </div>
      )
    },
    {
      name: "Class",
      selector: (row) => row?.Class
    },
    {
      name: "Tution Fee",
      selector: (row) => row?.TutionFee
    },
    {
      name: "Activity Fee",
      selector: (row) => row?.activityFee
    },
    {
      name: "Miscellenous Fee",
      selector: (row) => row?.miscellenousFee
    },
    {
      name: "Amount",
      selector: (row) => row?.Amount
    },
    {
      name: "Status",
      cell: (row) => <RenderStatus status={row?.Status} />
    },
    {
      name: "Action",
      width: "100px",
      cell: (row) => (
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
              onClick={() => setShowReviewModal(true)}
            >
              <GrStreetView size={18} /> Review
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  return (
    <>
      <CustomDataTable
        selectableRows
        columns={columns}
        data={[]}
        progressPending={false}
        paginationServer
        noDataComponent="No books found"
        paginationComponent
        totalResults={50}
      />
    </>
  );
};

export default DueFees;