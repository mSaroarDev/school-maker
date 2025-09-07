"use client";
import { TStudentResponse } from "@/api/students/students.interfaces";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import CustomDataTable from "@/components/_core/CustomDataTable";
import HeaderComponent from "@/components/_core/HeaderComponent";
import Card from "@/components/ui/card";
import { attDummyData } from "@/dummy/attendenceData";
import moment from "moment";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaRegCircle } from "react-icons/fa6";
import { IoCheckmarkCircle } from "react-icons/io5";
import Select from "react-select";

const AttendenceMain = () => {
  const breadTree = [
    { name: "Attendence" },
    { name: "Home", url: "/dashboard" },
    { name: "Attendence" },
  ];

  const columns = [
    {
      name: "Student Name",
      selector: (row: TStudentResponse) => row?.studentId?.fullName,
      sortable: true,
    },
    ...attDummyData[0].studentId.data.map((dateObj, index) => {
      const dayOfWeek = moment(dateObj.date).day(); // 0=Sunday, 1=Monday, ..., 5=Friday, 6=Saturday
      const isWeekend = dayOfWeek === 2 || dayOfWeek === 3; // Friday or Saturday

      return {
        name: moment(dateObj.date).format("DD"),
        width: "90px",
        cell: (row) => {
          if (isWeekend) {
            return <span className="text-gray-400">-</span>;
          }

          const attendanceRecord = row?.studentId?.data.find(
            (d) => moment(d.date).isSame(dateObj.date, "day")
          );

          if (!attendanceRecord || attendanceRecord.isPresent === undefined) {
            return <FaRegCircle size={20} className="text-primary" />;
          }

          return attendanceRecord.isPresent ? (
            <IoCheckmarkCircle size={22} className="text-primary" />
          ) : (
            <AiFillCloseCircle size={20} className="text-red-500" />
          );
        },
        id: `day-${index}`,
        style: isWeekend ? { backgroundColor: '#f3f4f6' } : {},
      };
    }),
  ];

  return (
    <>
      <div>
        <BreadcrumbsComponent breadTree={breadTree} showBackButton />
      </div>

      <Card>
        <HeaderComponent
          title="Attendence"
          extraComponent={
            <div className="flex items-center gap-2">
              <Select />
              <Select />
              <Select />
            </div>
          }
        />

        <CustomDataTable
          columns={columns}
          data={attDummyData}
          highlightOnHover={false}
          pointerOnHover={false}
          extraStyles={{
            rows: {
              style: {
                padding: "0 0.5rem",
              }
            }
          }}
        />
      </Card>
    </>
  );
};

export default AttendenceMain;