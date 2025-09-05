"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FiFilter, FiSearch } from "react-icons/fi";
import { LuPlus } from "react-icons/lu";

type HeaderComponentProps = {
  query?: string;
  setQuery?: (value: string) => void;
  title: string;
  createLink?: string;
  filterComponent?: React.ReactNode;
  showSearch?: boolean;
}

const HeaderComponent = ({
  showSearch = false,
  query,
  setQuery,
  title,
  createLink,
  filterComponent
}: HeaderComponentProps) => {

  console.log("query", query)
  const { push } = useRouter();

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{title || "Enter Title"}</h3>
        <div className="flex items-center gap-2">
          {showSearch && (
            <div className="hidden border border-primary/30 rounded-full md:flex items-center gap-2 px-2">
              <FiSearch size={20} className="text-primary/50" />
              <input
                className="outline-none py-1.5"
                placeholder="Search here..."
                value={query}
                onChange={(e) => setQuery?.(e.target.value)}
              />
            </div>
          )}


          {filterComponent && (
            <button className="header-buttons"><FiFilter size={18} /></button>
          )}

          {createLink && (
            <button onClick={() => push(createLink)} className="header-buttons"><LuPlus size={18} /></button>
          )}
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;