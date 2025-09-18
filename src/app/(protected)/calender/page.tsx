import CalenderMain from "@/views/calender/CalenderMain";

export const metadata = {
  title: `Calender - ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: "Manage and view your school calendar events",
}

const page = () => {
  return (
    <>
      <CalenderMain />
    </>
  );
};

export default page;