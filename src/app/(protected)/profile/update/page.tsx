import UpdateProfile from "@/pages/profile/UpdateProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Profile",
  description: "Update your profile information",
};

const page = () => {
  return (
    <>
      <UpdateProfile />
    </>
  );
};

export default page;