"use client";
import { useGetAllTransaction } from "@/api/finance/finance.hooks";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import CustomDataTable from "@/components/_core/CustomDataTable";
import HeaderComponent from "@/components/_core/HeaderComponent";
import { Modal } from "@/components/_core/Modal";
import Card from "@/components/ui/card";
import { FinanceBreadTree } from "@/helpers/breadcrumbs";
import { getRecentTransactionColumns } from "@/helpers/dataTableColumns/allTransactionColumns";
import { useState } from "react";
import ReviewModal from "./ReviewModal";

const FinanceMain = () => {
  const [showReviewModal, setShowReviewModal] = useState(false);

  const [currPage, setCurrPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const { data: transactions, isPending: isGetingTransactions } = useGetAllTransaction({
    type: ["income", "expense"],
    status: ["completed", "failed", "rejected"],
    currPage,
    limit
  });
  
  const columns = getRecentTransactionColumns();

  return (
    <>
      <BreadcrumbsComponent breadTree={FinanceBreadTree} />

      <Card>
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-6 lg:col-span-8">
            <div className="bg-slate-50"></div>
          </div>
          <div className="col-span-6 lg:col-span-4 grid grid-cols-2 gap-5">
            <div className="bg-primary-light p-3 rounded-lg h-32"></div>
            <div className="bg-primary-light p-3 rounded-lg h-32"></div>
            <div className="bg-primary-light p-3 rounded-lg h-32"></div>
            <div className="bg-primary-light p-3 rounded-lg h-32"></div>
          </div>
        </div>
      </Card>

      <Card className="mt-5">
        <HeaderComponent
          title="Recent Transactions"
          // createLink="/teachers/create"
          // query={query}
          // setQuery={setQuery}
          filterComponent={<></>}
          showSearch
        />

        <div className="mt-5">
          <CustomDataTable
            data={transactions?.data || []}
            columns={columns}
            currPage={currPage}
            setCurrPage={setCurrPage}
            limit={limit}
            setLimit={setLimit}
            progressPending={isGetingTransactions}
            totalResults={transactions?.totalResults || 0}
          />
        </div>
      </Card>

      {showReviewModal && (
        <Modal
          isOpen={showReviewModal}
          toggle={() => setShowReviewModal(false)}
          title="Change Status"
          description="Change the status of this transaction"
          showSubmitButton={false}
          showFooter={false}
          sideClick={true}
          size="xl"
        >
          <ReviewModal />
        </Modal>
      )}
    </>
  );
};

export default FinanceMain;