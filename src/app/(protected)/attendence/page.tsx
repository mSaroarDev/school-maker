import AttendenceMain from "@/pages/attendence/AttendenceMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Attendence - ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: "Attendence page",
};

const page = () => {
  return (
    <>
      <AttendenceMain />
    </>
  );
};

export default page;