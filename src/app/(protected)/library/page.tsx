import LibraryMain from "@/pages/library/LibraryMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Library - ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: "Library Page",
}

const page = () => {
  return (
    <>
      <LibraryMain />
    </>
  );
};

export default page;