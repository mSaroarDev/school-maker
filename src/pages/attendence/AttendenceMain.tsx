import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";

const AttendenceMain = () => {
  const breadTree = [
    { name: "Attendence" },
    { name: "Home", url: "/dashboard" },
    { name: "Attendence" },
  ];

  return (
    <>
      <div>
        <BreadcrumbsComponent breadTree={breadTree} showBackButton />
      </div>

      <h1>AttendenceMain</h1>
    </>
  );
};

export default AttendenceMain;