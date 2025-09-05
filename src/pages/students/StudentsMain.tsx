import HeaderComponent from "@/components/_core/HeaderComponent";
import StudentsList from "./StudentsList";
import Card from "@/components/ui/card";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";

const StudentsMain = () => {
  const breadTree = [
    { name: "Students" },
    { name: "Home", url: "/dashboard" },
    { name: "Students" },
  ];

  return (
    <>
      <div>
        <BreadcrumbsComponent breadTree={breadTree} showBackButton />
      </div>

      <Card>
        <HeaderComponent
          title="All Students"
          createLink="/students/create"
          // query={query}
          // setQuery={setQuery}
          filterComponent={<></>}
          showSearch
        />

        <div className="mt-5">
          <StudentsList />
        </div>
      </Card>
    </>
  );
};

export default StudentsMain;