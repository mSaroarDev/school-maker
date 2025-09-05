"use client";

import Card from "@/components/ui/card";
import { useEffect, useState } from "react";
import { FiFilter, FiSearch } from "react-icons/fi";
import { LuPlus } from "react-icons/lu";
import TeachersList from "./TeachersList";
import { useRouter } from "next/navigation";
import HeaderComponent from "@/components/_core/HeaderComponent";

const TeachersMain = () => {
  const [query, setQuery] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const {push} = useRouter();

  useEffect(() => {
    if (query.length === 0 || query.length > 2) {
      setTimeout(() => {
        setSearch(query);
      }, 1000);
    }
  }, [query]);


  return (
    <>
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