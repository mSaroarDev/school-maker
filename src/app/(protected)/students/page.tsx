import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Students - ${process.env.NEXT_PUBLIC_COMPANY_NAME}`,
    description: 'Students page',
}

const page = () => {
    return (
        <>
            <h1>page</h1>
        </>
    );
};

export default page;