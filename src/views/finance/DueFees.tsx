'use client';
import { useGetAllTransaction } from "@/api/finance/finance.hooks";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import CustomDataTable from "@/components/_core/CustomDataTable";
import HeaderComponent from "@/components/_core/HeaderComponent";
import { Modal } from "@/components/_core/Modal";
import Card from "@/components/ui/card";
import { FinanceDueBreadTree } from "@/helpers/breadcrumbs";
import { getDueFeesColumns } from "@/helpers/dataTableColumns/dueFeesColumns";
import { useEffect, useState } from "react";
import CreateDueModal from "./CreateDueModal";
import ReviewTransactionModal from "./ReviewTransactionModal";
import { TTransactions } from "@/api/finance/finance.types";

const DueFees = () => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TTransactions | null>(null);
  const columns = getDueFeesColumns({ setShowReviewModal, setSelectedTransaction });

  const [currPage, setCurrPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [search, setSearch] = useState<string>("");

  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data: transactions, isPending: isGetingTransactions } = useGetAllTransaction({
    status: ["due", "overdue"],
    currPage,
    limit,
    startDate,
    endDate,
    search,
  });

  const [input, setInput] = useState<string>("");
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setCurrPage(1);
      setSearch(input);
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [input]);

  return (
    <>
      <BreadcrumbsComponent breadTree={FinanceDueBreadTree} />

      <Card>
        <HeaderComponent
          title="Due Fees"
          query={input}
          setQuery={setInput}
          filterComponent={<></>}
          createButtonFunction={() => setShowCreateModal(true)}
          showSearch
        />

        <CustomDataTable
          columns={columns}
          data={transactions?.data || []}
          progressPending={isGetingTransactions}
          totalResults={transactions?.totalResults || 0}
          currPage={currPage}
          setCurrPage={setCurrPage}
          limit={limit}
          setLimit={setLimit}
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