import DueFees from "@/views/finance/DueFees";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Due Fees - Finance`,
  description: "Due Fees Dashboard",
}

const page = () => {
    return (
        <>
          <DueFees />
        </>
    );
};

export default page;