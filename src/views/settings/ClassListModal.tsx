import { useGetAllClasses } from "@/api/class/class.hooks";
import { TClassResponse } from "@/api/class/class.interfaces";
import CustomDataTable from "@/components/_core/CustomDataTable";
import { useState } from "react";

const ClassListModal = () => {
  const { data: classes, isPending } = useGetAllClasses();
  const [currPage, setCurrPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const desktopColumns = [
    {
      name: "Display Name",
      selector: (row: TClassResponse) => row.displayName,
    },
    {
      name: "Class",
      width: "150px",
      selector: (row: TClassResponse) => row.classValue,
    }
  ];

  return (
    <>
      <CustomDataTable
        data={classes?.data || []}
        columns={desktopColumns}
        mobileColumns={desktopColumns}
        currPage={currPage}
        setCurrPage={setCurrPage}
        limit={limit}
        setLimit={setLimit}
        totalResults={classes?.data?.length || 0}
        progressPending={isPending}
      />
    </>
  );
};

export default ClassListModal;