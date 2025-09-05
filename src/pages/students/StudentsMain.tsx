import HeaderComponent from "@/components/_core/HeaderComponent";
import StudentsList from "./StudentsList";
import Card from "@/components/ui/card";

const StudentsMain = () => {
  return (
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
  );
};

export default StudentsMain;