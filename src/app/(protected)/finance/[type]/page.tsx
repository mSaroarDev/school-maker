import FinanceMain from "@/views/finance/FinanceMain";
import IncomeMain from "@/views/finance/IncomeMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Dashboard - Finance`,
  description: "Finance Dashboard",
};

type PageProps = {
  params: {
    type: string;
  };
};

const page = async ({ params }: PageProps) => {
  const { type } = await params;

  return type === "income" || type === "expense" ? <IncomeMain /> : <FinanceMain />
};

export default page;