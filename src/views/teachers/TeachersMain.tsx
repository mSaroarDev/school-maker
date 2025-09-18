"use client";

import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import HeaderComponent from "@/components/_core/HeaderComponent";
import Card from "@/components/ui/card";
import { useEffect, useState } from "react";
import TeachersList from "./TeachersList";

const TeachersMain = () => {
  const [query, setQuery] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (query.length === 0 || query.length > 2) {
      setTimeout(() => {
        setSearch(query);
      }, 1000);
    }
  }, [query]);

  const breadTree = [
    { name: "Teachers" },
    { name: "Home", url: "/dashboard" },
    { name: "Teachers" },
  ];


  return (
    <>
      <div>
        <BreadcrumbsComponent breadTree={breadTree} />
      </div>

      <Card>
        <HeaderComponent
          title="All Teachers"
          createLink="/teachers/create"
          query={query}
          setQuery={setQuery}
          filterComponent={<></>}
          showSearch
        />

        <TeachersList
          search={search}
        />
      </Card>
    </>
  );
};

export default TeachersMain;