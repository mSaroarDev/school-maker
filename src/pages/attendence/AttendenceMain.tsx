"use client";
import { useGetAllAttendence } from "@/api/attendence/attendence.hooks";
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
import { useEffect, useState } from "react";
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

  const { data: classes, isPending } = useGetAllClasses();

  const filters = {
    year: new Date().getFullYear().toString(),
    month: monthOptions[new Date().getMonth()].value,
    week: weekOptions[0].value,
    classId: "",
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

  const { data: attendence } = useGetAllAttendence({
    classId: "68b094ab5617f1ce94ddb9d5",
    year: getValues("year"),
    month: getValues("month"),
    week: getValues("week"),
  });

  console.log("Attendence Data:", attendence);

  const uniqueDates = attendence?.data?.[0]?.data || [];

  const columns = [
    {
      name: "Student Name",
      selector: (row) => row?.student?.fullName,
      sortable: true,
      width: "200px",
    },
    ...uniqueDates.map((dateObj, index) => {
      const dayOfWeek = moment(dateObj.date).day();
      const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;

      return {
        name: moment(dateObj.date).format("DD"), // Display Day (01, 02...)
        width: "90px",
        center: true,
        cell: (row) => {
          if (isWeekend) {
            return <span className="text-gray-400 w-full mx-auto">-</span>;
          }

          // Find attendance record for this date
          const attendanceRecord = row.data.find((d) =>
            moment(d.date).isSame(dateObj.date, "day")
          );

          if (!attendanceRecord || attendanceRecord.isPresent === undefined) {
            return <FaRegCircle size={18} className="text-primary" />; // No data
          }

          return attendanceRecord.isPresent ? (
            <IoCheckmarkCircle size={22} className="text-primary" /> // Present
          ) : (
            <AiFillCloseCircle size={20} className="text-red-500" /> // Absent
          );
        },
        id: `day-${index}`,
        style: isWeekend ? { backgroundColor: "#f3f4f6" } : {},
      };
    }),
  ];


  const onSubmit = (data: typeof filters) => {
    console.log(data);
  };

  useEffect(() => {
    if (classes?.data?.length && !getValues("classId")) {
      setValue("classId", classes.data[0]._id.toString());
    }
  }, [classes, setValue, getValues]);

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
          data={attendence?.data || []}
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