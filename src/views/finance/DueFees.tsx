'use client';
import CustomDataTable from "@/components/_core/CustomDataTable";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RenderStatus from "@/components/_core/RenderStatus";
import { MdMoreVert } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import { GrStreetView } from "react-icons/gr";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import { FinanceDueBreadTree } from "@/helpers/breadcrumbs";
import Card from "@/components/ui/card";
import HeaderComponent from "@/components/_core/HeaderComponent";
import { DueFeesData } from "@/dummy/DueFees";
import { SiFreelancer } from "react-icons/si";
import { useState } from "react";
import { getDueFeesColumns } from "@/helpers/dataTableColumns/dueFeesColumns";
import CreateDueModal from "./CreateDueModal";
import { Modal } from "@/components/_core/Modal";
import { useGetAllTransaction } from "@/api/finance/finance.hooks";

const DueFees = () => {

  const columns = getDueFeesColumns();

  const [query, setQuery] = useState("");

  const [showCreateModal, setShowCreateModal] = useState(false);

    const { data: transactions, isPending: isGetingTransactions } = useGetAllTransaction({
      type: "due",
      currPage: 1,
      limit: 50
    });

  return (
    <>
      <BreadcrumbsComponent breadTree={FinanceDueBreadTree} />

      <Card>
        <HeaderComponent
          title="Due Fees"
          query={query}
          setQuery={setQuery}
          filterComponent={<></>}
          createButtonFunction={() => setShowCreateModal(true)}
          showSearch
        />

        <CustomDataTable
          selectableRows
          columns={columns}
          data={transactions?.data || []}
          progressPending={isGetingTransactions}
          paginationServer
          paginationComponent
          totalResults={50}
        />
      </Card>

      {showCreateModal && (
        <Modal
          isOpen={showCreateModal}
          toggle={() => setShowCreateModal(false)}
          title={`Create Due Fee`}
          description="Add new transaction details"
          showSubmitButton={false}
          showFooter={false}
          sideClick={true}
          size="xl"
        >
          <CreateDueModal />
        </Modal>
      )}
    </>
  );
};

export default DueFees;