import StudentProfile from "@/pages/students/StudentProfile";
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