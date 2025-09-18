"use client";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import HeaderComponent from "@/components/_core/HeaderComponent";
import Card from "@/components/ui/card";
import { LibraryBreadTree } from "@/helpers/breadcrumbs";

const LibraryMain = () => { 
  
    return (
        <>
          <BreadcrumbsComponent 
            breadTree={LibraryBreadTree}
          />

          <Card>
            <HeaderComponent 
              title="Library"
              createButtonFunction={() => {}}
              showSearch
              searchPlaceholder="Search books..."
            />
          </Card>
        </>
    );
};

export default LibraryMain;