"use client";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import HeaderComponent from "@/components/_core/HeaderComponent";
import Card from "@/components/ui/card";
import { useEffect, useState } from "react";
import TeachersList from "./TeachersList";
import { useParams } from "next/navigation";

const TeachersMain = () => {
  const [query, setQuery] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const params = useParams();
  const employeeType = params.employeeType as string;

  useEffect(() => {
    if (query.length === 0 || query.length > 2) {
      setTimeout(() => {
        setSearch(query);
      }, 1000);
    }
  }, [query]);

  const breadTree = [
    { name: employeeType || "Teachers" },
    { name: "Home", url: "/dashboard" },
    { name: employeeType || "Teachers" },
  ];


  return (
    <>
      <div>
        <BreadcrumbsComponent breadTree={breadTree} />
      </div>

      <Card>
        <HeaderComponent
          title={employeeType ? employeeType.charAt(0).toUpperCase() + employeeType.slice(1) : "Teachers"}
          createLink={`/employees/${employeeType}/create`}
          query={query}
          setQuery={setQuery}
          filterComponent={<></>}
          showSearch
        />

        <TeachersList search={search} />
      </Card>
    </>
  );
};

export default TeachersMain;