"use client";

import Card from "@/components/ui/card";
import { useEffect, useState } from "react";
import { FiFilter, FiSearch } from "react-icons/fi";
import { LuPlus } from "react-icons/lu";
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


  return (
    <>
      <Card>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">All Teachers</h3>
          <div className="flex items-center gap-2">
            <div className="hidden border border-primary/30 rounded-full md:flex items-center gap-2 px-2">
              <FiSearch size={20} className="text-primary/50" />
              <input
                className="outline-none py-1.5"
                placeholder="Search teachers..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <button className="header-buttons"><FiFilter size={18} /></button>
            <button className="header-buttons"><LuPlus size={18} /></button>
          </div>
        </div>

        <TeachersList 
          search={search}
        />
      </Card>
    </>
  );
};

export default TeachersMain;