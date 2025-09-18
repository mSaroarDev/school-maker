import ProfilePageMain from "@/views/profile/Main";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile - School Maker",
  description: "User profile page",
}

const page = () => {
  return (
    <>
      <ProfilePageMain />
    </>
  );
};

export default page;