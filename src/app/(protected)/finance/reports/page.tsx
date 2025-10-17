import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Finance Reports - ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: "Finance Reports Page",
}

const page = () => {
    return (
        <>
            <h1>page</h1>
        </>
    );
};

export default page;