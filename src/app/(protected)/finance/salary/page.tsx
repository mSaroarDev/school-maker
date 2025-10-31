import SalaryMain from "@/views/salary/SalaryMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Salary - Finance`,
  description: "Finance Salary Dashboard",
};

const page = () => {
  return (
    <>
      <SalaryMain />
    </>
  );
};

export default page;