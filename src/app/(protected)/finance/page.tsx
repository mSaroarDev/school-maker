import FinanceMain from "@/views/finance/FinanceMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Dashboard - Finance`,
  description: "Finance Dashboard",
}

const page = () => {
  return (
    <>
      <FinanceMain />
    </>
  );
};

export default page;