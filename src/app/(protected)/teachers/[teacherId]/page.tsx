import CreateTeacher from "@/pages/teachers/CreateTeacher";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Add New Teacher - ${process.env.NEXT_PUBLIC_COMPANY_NAME}`,
  description: "Add a new teacher to your Institute.",
}

const page = () => {

  return (
    <>
      <CreateTeacher />
    </>
  );
};

export default page;