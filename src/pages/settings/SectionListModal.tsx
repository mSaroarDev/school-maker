import { useGetAllSections } from "@/api/sections/section.hooks";
import { TSection } from "@/api/sections/sections.types";
import CustomDataTable from "@/components/_core/CustomDataTable";
import { useState } from "react";

const SectionsListModal = () => {
  const { data: sections, isPending } = useGetAllSections();
  const [currPage, setCurrPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const desktopColumns = [
    {
      name: "Section Name",
      selector: (row: TSection) => row?.sectionName,
    }
  ];

  return (
    <>
      <CustomDataTable
        data={sections?.data || []}
        columns={desktopColumns}
        mobileColumns={desktopColumns}
        currPage={currPage}
        setCurrPage={setCurrPage}
        limit={limit}
        setLimit={setLimit}
        totalResults={sections?.data?.length || 0}
        progressPending={isPending}
      />
    </>
  );
};

export default SectionsListModal;