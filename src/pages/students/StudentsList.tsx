"use client";
import { useGetAllStudents } from "@/api/students/teachers.hooks";

const StudentsList = () => {
  const {data: students} = useGetAllStudents({
    limit: 10,
    currPage: 1,
  });

  console.log(students);

    return (
        <>
          
        </>
    );
};

export default StudentsList;