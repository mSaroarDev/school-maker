import MessagesMain from "@/views/messages/MessagesMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Messages - ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: "Messages page",
};

const page = () => {
  return (
    <>
      <MessagesMain />
    </>
  );
};

export default page;