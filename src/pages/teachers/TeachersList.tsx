import { useGetAllTeachers } from "@/api/teachers/teachers.hooks";
import { Teacher } from "@/api/teachers/teachers.interfaces";
import Image from "next/image";
import AvatarPlaceholder from "@/assets/images/avatar.jpeg";
import CustomDataTable from "@/components/_core/CustomDataTable";
import { MdMoreVert } from "react-icons/md";
import { useState } from "react";

const TeachersList = () => {

  const [currPage, setCurrPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const { data: teachers, isPending } = useGetAllTeachers({
    currPage: currPage,
    limit: limit,
  });

  const desktopColumns = [
    {
      name: "Teacher Name",
      cell: (row: Teacher) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 relative rounded-full overflow-hidden">
            <Image
              src={row?.avatar || AvatarPlaceholder}
              alt={row?.fullName}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold">{row?.fullName}</h3>
            <p className="font-light text-xs line-clamp-1">{row?.email}</p>
          </div>
        </div>
      )
    },
    {
      name: "Emp ID",
      selector: (row: Teacher) => row?.employeeId,
    },
    {
      name: "Subject",
      cell: (row: Teacher) => "N/A",
    },
    {
      name: "Class",
      cell: (row: Teacher) => "N/A",
    },
    {
      name: "Phone No",
      cell: (row: Teacher) => row?.phoneNumber || "N/A",
    },
    {
      name: "Address",
      cell: (row: Teacher) => row?.currentAddress || "N/A",
    },
    {
      name: "Action",
      width: "100px",
      cell: (row: Teacher) => (
        <button className="more-action-button"><MdMoreVert size={20} /></button>
      )
    }
  ];

  const mobileColumns = [
    {
      name: "Teacher Name",
      cell: (row: Teacher) => (
        <div className="flex items-center gap-4">
          <div className="w-14 h-10 relative rounded-sm ring-primary/20 overflow-hidden ring">
            <Image
              src={row?.avatar || AvatarPlaceholder}
              alt={row?.fullName}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold">{row?.fullName}</h3>
            <p className="font-light text-xs line-clamp-1">{row?.email}</p>
          </div>
        </div>
      )
    },
    {
      name: "Action",
      width: "50px",
      cell: (row: Teacher) => (
        <button className="more-action-button"><MdMoreVert size={20} /></button>
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
      />
    </>
  );
};

export default TeachersList;