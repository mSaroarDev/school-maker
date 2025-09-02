import TeachersMain from "@/pages/teachers/TeachersMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Teachers - ${process.env.NEXT_PUBLIC_COMPANY_NAME}`,
  description: `Manage and organize your teachers with ${process.env.NEXT_PUBLIC_COMPANY_NAME}`,
};

const page = () => {
  return (
    <>
      <TeachersMain />
    </>
  );
};

export default page;