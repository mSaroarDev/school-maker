import StudentProfile from "@/views/students/StudentProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Profile",
  description: "Student Profile Page",
};

const page = () => {

  return (
    <>
      <StudentProfile />
    </>
  );
};

export default page;