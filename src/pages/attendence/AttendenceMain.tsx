"use client";
import { useGetAllClasses } from "@/api/class/class.hooks";
import { TClassResponse } from "@/api/class/class.interfaces";
import { TStudentResponse } from "@/api/students/students.interfaces";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import CustomDataTable from "@/components/_core/CustomDataTable";
import HeaderComponent from "@/components/_core/HeaderComponent";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import SelectComponent from "@/components/ui/select";
import { monthOptions, weekOptions, yearsOptions } from "@/constants/constants";
import { attDummyData } from "@/dummy/attendenceData";
import { handleErrorMessage } from "@/utils/handleErrorMessage";
import { showToast } from "@/utils/showToast";
import moment from "moment";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaRegCircle } from "react-icons/fa6";
import { FiFilter } from "react-icons/fi";
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

  const { data: classes, isPending } = useGetAllClasses();

  console.log("Classes:", classes?.data[0]?._id);

  const filters = {
    year: new Date().getFullYear().toString(),
    month: monthOptions[new Date().getMonth()].value,
    week: weekOptions[0].value,
    classId: classes?.data[0]?._id.toString() || "",
  }
  const {
    control,
    watch,
    setValue,
    getValues,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: filters
  });

  const onSubmit = (data: typeof filters) => {
    console.log(data);
  };

  if (isPending) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div>
        <BreadcrumbsComponent breadTree={breadTree} showBackButton />
      </div>

      <Card>
        <HeaderComponent
          title="Attendence"
          extraComponent={
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center gap-2">

                <SelectComponent
                  options={yearsOptions}
                  placeholder="Year"
                  className="w-24"
                  control={control}
                  name="year"
                  rules={{ required: "Select Year" }}
                />
                
                <SelectComponent
                  options={monthOptions}
                  placeholder="Month"
                  className="w-40"
                  control={control}
                  name="month"
                  rules={{ required: "Select Month" }}
                />
                <SelectComponent
                  options={weekOptions}
                  placeholder="Week"
                  className="w-32"
                  control={control}
                  name="week"
                  rules={{ required: "Select Weeek" }}
                />
                <SelectComponent
                  options={classes?.data?.map((cls: TClassResponse) => ({ value: cls?._id, label: cls?.displayName })) ?? []}
                  placeholder="Class"
                  className="w-36"
                  isLoading={isPending}
                  control={control}
                  name="classId"
                  rules={{ required: "Select Class" }}
                />
                <Button type="submit" onClick={() => console.log("Button pressed")}><FiFilter size={18} /> Filter</Button>
              </div>
            </form>
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