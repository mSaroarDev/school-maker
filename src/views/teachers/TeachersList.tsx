import { useGetAllTeachers, useUpdateTeacher } from "@/api/teachers/teachers.hooks";
import { TTeacherPayloadTeacher } from "@/api/teachers/teachers.interfaces";
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
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { HiTrash } from "react-icons/hi";
import { MdMoreVert } from "react-icons/md";
import { PiUserSquareFill } from "react-icons/pi";

interface ITeachersListProps {
  search: string;
}

const TeachersList = ({ search }: ITeachersListProps) => {
  const [currPage, setCurrPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const { data: teachers, isPending } = useGetAllTeachers({
    currPage: currPage,
    limit: limit,
    search: search
  });

  const { push } = useRouter();

  const { mutateAsync: updateTeacher } = useUpdateTeacher();
  const handleUpdateTeacher = (teacherId: string) => {
    showConfirmModal({
      title: "Are you sure?",
      text: "You want to delete this teacher",
      confirmText: "Yes, Delete",
      cancelText: "No, Cancel",
      func: async () => {
        try {
          const res = await updateTeacher({
            teacherId,
            data: { isDeleted: true }
          });

          if (res?.success) {
            showToast("success", "Teacher Info Deleted");
          }
        } catch (error) {
          showToast("error", handleErrorMessage(error));
        }
      }
    });
  }

  const desktopColumns = [
    {
      name: "Teacher Name",
      cell: (row: TTeacherPayloadTeacher) => (
        <div className="flex items-center gap-4">
          <Avatar 
            fullName={row?.fullName}
            avatar={row?.avatar}
          />
          <div>
            <h3 onClick={()=> push(`/teachers/profile/${row?._id}`)} className="font-semibold">{row?.fullName}</h3>
            <p className="font-light text-xs line-clamp-1">{row?.employeeId}</p>
          </div>
        </div>
      )
    },
    {
      name: "Email",
      cell: (row: TTeacherPayloadTeacher) => (
        <div className="line-clamp-1">{row?.email || "N/A"}</div>
      ),
    },
    {
      name: "Subject",
      cell: (row: TTeacherPayloadTeacher) => (
        row?.teachingSubjects?.length ? row.teachingSubjects.slice(0, 3).join(", ") : "N/A"
      ),
    },
    {
      name: "Class",
      cell: (row: TTeacherPayloadTeacher) => (
        row?.classes?.length ? row.classes.slice(0, 3).join(", ") : "N/A"
      ),
    },
    {
      name: "Phone No",
      cell: (row: TTeacherPayloadTeacher) => row?.phoneNumber || "N/A",
    },
    {
      name: "Address",
      cell: (row: TTeacherPayloadTeacher) => row?.currentAddress || "N/A",
    },
    {
      name: "Action",
      width: "100px",
      cell: (row: TTeacherPayloadTeacher) => (
        <DropdownMenu>
          <DropdownMenuTrigger className="more-action-button">
            <MdMoreVert size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Action</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => push(`/teachers/profile/${row?._id}`)}
            >
              <PiUserSquareFill size={18} /> View Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => push(`/teachers/${row?._id}`)}
            >
              <BiEdit size={18} /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleUpdateTeacher(row?._id ? row._id : "")}
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
      cell: (row: TTeacherPayloadTeacher) => (
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
            <h3 onClick={()=> push(`/teachers/profile/${row?._id}`)} className="font-semibold">{row?.fullName}</h3>
            <p className="font-light text-xs line-clamp-1">{row?.email}</p>
          </div>
        </div>
      )
    },
    {
      name: "Action",
      width: "50px",
      cell: (row: TTeacherPayloadTeacher) => (
        <DropdownMenu>
          <DropdownMenuTrigger className="more-action-button">
            <MdMoreVert size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Action</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => push(`/teachers/profile/${row?._id}`)}
            >
              <PiUserSquareFill size={18} /> View Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => push(`/teachers/${row?._id}`)}
            >
              <BiEdit size={18} /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleUpdateTeacher(row?._id ? row._id : "")}
            >
              <HiTrash size={18} /> Delete
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  return (
    <>
      <CustomDataTable
        data={teachers?.data || []}
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        currPage={currPage}
        setCurrPage={setCurrPage}
        limit={limit}
        setLimit={setLimit}
        totalResults={teachers?.totalResults || 0}
        progressPending={isPending}
      />
    </>
  );
};

export default TeachersList;