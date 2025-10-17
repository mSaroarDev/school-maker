import InvoiceMain from "@/views/finance/InvoicePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Receipt Details - ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: `Receipt details page for ${process.env.NEXT_PUBLIC_APP_NAME} application`,
}

const page = () => {
  return (
    <>
      <InvoiceMain />
    </>
  );
};

export default page;