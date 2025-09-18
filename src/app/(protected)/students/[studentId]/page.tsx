
import StudentCreate from "@/views/students/StudentCreate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Create Student - ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: 'Create Student page',
}

const page = () => {
    return (
        <>
          <StudentCreate />
        </>
    );
};

export default page;