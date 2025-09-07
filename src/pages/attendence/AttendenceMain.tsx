"use client";
import { useGetAllAttendence, useUpdateAttendence } from "@/api/attendence/attendence.hooks";
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
import { set, useForm } from "react-hook-form";
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

  const [attendanceRecords, setAttendanceRecords] = useState();

  const watchedClassId = watch("classId");
  const watchedYear = watch("year");
  const watchedMonth = watch("month");
  const watchedWeek = watch("week");

  const { data: attendence } = useGetAllAttendence({
    classId: watchedClassId,
    year: watchedYear,
    month: watchedMonth,
    week: watchedWeek,
  });

  const uniqueDates = attendanceRecords?.data?.[0]?.data || [];

  const columns = [
    {
      name: "Student Name",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <img
            src={row.profileImage || "/default-profile.png"}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-medium">{row?.student?.fullName}</span>
        </div>
      ),
      sortable: true,
    },
    ...uniqueDates.map((dateObj, index) => {
      const dayOfWeek = moment(dateObj.date).day();
      const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;

      return {
        name: moment(dateObj.date).format("DD"),
        width: "90px",
        cell: (row) => {
          if (isWeekend) {
            return <span className="text-gray-400 w-full mx-auto">-</span>;
          }

          // Find attendance record for this date
          const attendanceRecord = row.data.find((d) =>
            moment(d.date).isSame(dateObj.date, "day")
          );

          if (!attendanceRecord || attendanceRecord.isPresent === undefined || attendanceRecord.isPresent === null) {
            return <div className="w-full text-center pl-1.5">
              <FaRegCircle
                onClick={() => handleUpdateAttendance({
                  studentId: row.student._id,
                  date: moment(dateObj.date).format("YYYY-MM-DD"),
                  isPresent: true
                })}
                size={18}
                className="text-primary"
              />
            </div>
          }

          return attendanceRecord.isPresent ? (
            <div className="w-full text-center pl-1.5">
              <IoCheckmarkCircle
                onClick={() => handleUpdateAttendance({
                  studentId: row.student._id,
                  date: moment(dateObj.date).format("YYYY-MM-DD"),
                  isPresent: false
                })}
                size={22}
                className="text-primary"
              />
            </div> // Present
          ) : (
            <div className="w-full text-center pl-1.5">
              <AiFillCloseCircle
                onClick={() => handleUpdateAttendance({
                  studentId: row.student._id,
                  date: moment(dateObj.date).format("YYYY-MM-DD"),
                  isPresent: null
                })}
                size={20}
                className="text-red-500"
              />
            </div>
          );
        },
        id: `day-${index}`,
        style: isWeekend ? { backgroundColor: "#f3f4f6" } : { display: 'flex', justifyContent: 'center' },
      };
    }),
  ];

  const onSubmit = (data: typeof filters) => {
    console.log(data);
  };

  const { mutateAsync: updateAttendence } = useUpdateAttendence();

  const handleUpdateAttendance = async (payload: { studentId: string, date: string, isPresent?: boolean }) => {
    console.log("Update attendance:", {
      ...payload,
      classId: getValues("classId"),
      date: moment(payload.date).format("YYYY-MM-DD"),
    });

    try {
      const res = await updateAttendence({
        ...payload,
        classId: getValues("classId"),
        date: moment(payload.date).format("YYYY-MM-DD"),
      })

      if (res?.success) {
        showToast("success", "Attendance updated successfully");
      }
    } catch (error) {
      showToast("error", handleErrorMessage(error))
    }
  }

  useEffect(() => {
    if (classes?.data?.length && !getValues("classId")) {
      setValue("classId", classes.data[0]._id.toString());
    }
  }, [classes, setValue, getValues]);

  useEffect(() => {
    setAttendanceRecords(attendence);
  }, [attendence]);

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