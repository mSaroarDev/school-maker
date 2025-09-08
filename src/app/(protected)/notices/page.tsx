import NoticesMain from "@/pages/notices/NoticesMain";

export const metadata = {
  title: `Notices - ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: "Notices",
}

const page = () => {
  return (
    <>
      <NoticesMain />
    </>
  );
};

export default page;