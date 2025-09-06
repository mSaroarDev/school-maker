import { useGetAllSessions } from "@/api/session/sessions.hooks";
import { TSession } from "@/api/session/sessions.types";
import CustomDataTable from "@/components/_core/CustomDataTable";
import { useState } from "react";

const SessionsListModal = () => {
  const { data: sessions, isPending } = useGetAllSessions();
  const [currPage, setCurrPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const desktopColumns = [
    {
      name: "Session Name",
      selector: (row: TSession) => row?.sessionName,
    },
    {
      name: "Year",
      width: "150px",
      selector: (row: TSession) => row?.year  ,
    }
  ];

  return (
    <>
      <CustomDataTable
        data={sessions?.data || []}
        columns={desktopColumns}
        mobileColumns={desktopColumns}
        currPage={currPage}
        setCurrPage={setCurrPage}
        limit={limit}
        setLimit={setLimit}
        totalResults={sessions?.data?.length || 0}
        progressPending={isPending}
      />
    </>
  );
};

export default SessionsListModal;