import { Metadata } from "next";

  export const metadata: Metadata = {
    title: `Dashboard - ${[process.env.COMPANY_NAME ?? 'School Hub']}`,
    description: "YourShop Dashboard",
  }

const page = () => {
    return (
        <>
            <h1>page</h1>
        </>
    );
};

export default page;

