import IncomeMain from "@/views/finance/IncomeMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Dashboard - Finance`,
  description: "Finance Dashboard",
}


const page = () => {
  return (
    <>
      <IncomeMain />
    </>
  );
};

export default page;