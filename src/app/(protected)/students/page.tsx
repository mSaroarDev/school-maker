import StudentsMain from "@/pages/students/StudentsMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Students - ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: 'Students page',
}

const page = () => {
  return (
    <>
      <StudentsMain />
    </>
  );
};

export default page;