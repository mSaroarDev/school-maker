"use client";
import { useGetAllStudents, useUpdateStudent } from "@/api/students/students.hooks";
import { TStudentResponse } from "@/api/students/students.interfaces";
import AvatarPlaceholder from "@/assets/images/avatar.jpeg";
import Avatar from "@/components/_core/Avatar";
import CustomDataTable from "@/components/_core/CustomDataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { handleErrorMessage } from "@/utils/handleErrorMessage";
import { showConfirmModal } from "@/utils/showConfirmModal";
import { showToast } from "@/utils/showToast";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { HiTrash } from "react-icons/hi";
import { MdMoreVert } from "react-icons/md";
import { PiUserSquareFill } from "react-icons/pi";

const StudentsList = () => {
  const { push } = useRouter();
  const { data: students, isPending } = useGetAllStudents({
    limit: 10,
    currPage: 1,
  });

  const { mutateAsync: updateStudent } = useUpdateStudent();

  const [currPage, setCurrPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const desktopColumns = [
    {
      name: "Student Name",
      cell: (row: TStudentResponse) => (
        <div className="flex items-center gap-4">
          <Avatar
            fullName={row?.fullName || "N/A"}
            avatar={row?.avatar}
          />
          <div>
            <h3 onClick={() => push(`/students/profile/${row?._id}`)} className="font-medium hover:underline">{row?.fullName}</h3>
            <p className="font-light text-xs line-clamp-1">{row?.contactInformation?.email}</p>
          </div>
        </div>
      )
    },
    {
      name: "Student ID",
      selector: (row: TStudentResponse) => row?.studentId || "N/A",
    },
    {
      name: "Class",
      cell: (row: TStudentResponse) => row?.class?.displayName || "N/A",
    },
    {
      name: "DOB",
      cell: (row: TStudentResponse) => row?.basicInformation?.dateOfBirth ? moment().format("DD/MM/YYYY") : "N/A",
    },
    {
      name: "Phone No",
      cell: (row: TStudentResponse) => row?.contactInformation?.phoneNumber || "N/A",
    },
    {
      name: "Address",
      cell: (row: TStudentResponse) => row?.contactInformation?.address || "N/A",
    },
    {
      name: "Action",
      width: "100px",
      cell: (row: TStudentResponse) => (
        <DropdownMenu>
          <DropdownMenuTrigger className="more-action-button">
            <MdMoreVert size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Action</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => push(`/students/profile/${row?._id}`)}
            >
              <PiUserSquareFill size={18} /> View Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => push(`/students/${row?._id}`)}
            >
              <BiEdit size={18} /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleUpdate(row?._id ? row._id : "")}
            >
              <HiTrash size={18} /> Delete
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  const mobileColumns = [
    {
      name: "Teacher Name",
      cell: (row: TStudentResponse) => (
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-14 h-10 relative rounded-sm ring-primary/20 overflow-hidden ring">
            <Image
              src={row?.avatar || AvatarPlaceholder}
              alt={row?.fullName}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 onClick={() => push(`/students/profile/${row?._id}`)} className="font-semibold">{row?.fullName}</h3>
            <p className="font-light text-xs line-clamp-1">{row?.contactInformation?.email}</p>
          </div>
        </div>
      )
    },
    {
      name: "Action",
      width: "50px",
      cell: (row: TStudentResponse) => (
        <DropdownMenu>
          <DropdownMenuTrigger className="more-action-button">
            <MdMoreVert size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Action</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => push(`/students/profile/${row?._id}`)}
            >
              <PiUserSquareFill size={18} /> View Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => push(`/students/${row?._id}`)}
            >
              <BiEdit size={18} /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleUpdate(row?._id ? row._id : "")}
            >
              <HiTrash size={18} /> Delete
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  const handleUpdate = (studentId: string) => {
    showConfirmModal({
      title: "Are you sure?",
      text: "You want to update the status of this student.",
      confirmText: "Yes, Update it",
      cancelText: "No, Keep it",
      func: async () => {
        try {
          const res = await updateStudent({
            studentId,
            data: { isDeleted: true }
          });

          if (res?.success) {
            showToast("success", "Student deleted");
          }
        } catch (error) {
          showToast("error", handleErrorMessage(error));
        }
      }
    })
  }

  return (
    <>
      <CustomDataTable
        data={students?.data || []}
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        currPage={currPage}
        setCurrPage={setCurrPage}
        limit={limit}
        setLimit={setLimit}
        totalResults={students?.totalResults || 0}
        progressPending={isPending}
      />
    </>
  );
};

export default StudentsList;