'use client';
import { useGetAllTransaction } from "@/api/finance/finance.hooks";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import CustomDataTable from "@/components/_core/CustomDataTable";
import HeaderComponent from "@/components/_core/HeaderComponent";
import { Modal } from "@/components/_core/Modal";
import Card from "@/components/ui/card";
import { FinanceDueBreadTree } from "@/helpers/breadcrumbs";
import { getDueFeesColumns } from "@/helpers/dataTableColumns/dueFeesColumns";
import { useState } from "react";
import CreateDueModal from "./CreateDueModal";
import ReviewTransactionModal from "./ReviewTransactionModal";
import { TTransactions } from "@/api/finance/finance.types";

const DueFees = () => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TTransactions | null>(null);
  const columns = getDueFeesColumns({setShowReviewModal, setSelectedTransaction});
  const [query, setQuery] = useState("");

  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data: transactions, isPending: isGetingTransactions } = useGetAllTransaction({
    status: ["due", "overdue"],
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
          columns={columns}
          data={transactions?.data || []}
          progressPending={isGetingTransactions}
          paginationServer
          paginationComponent
          totalResults={transactions?.totalResults || 0}
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

      {showReviewModal && (
        <Modal
          isOpen={showReviewModal}
          toggle={() => setShowReviewModal(false)}
          title={`Review Transaction`}
          description="Review transaction details"
          showSubmitButton={false}
          showFooter={false}
          sideClick={true}
          size="xl"
        >
          <ReviewTransactionModal 
            selectedTransaction={selectedTransaction}
            setShowReviewModal={setShowReviewModal}
          />
        </Modal>
      )}
    </>
  );
};

export default DueFees;