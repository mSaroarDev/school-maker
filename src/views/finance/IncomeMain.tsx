"use client";
import { useGetAllTransaction } from "@/api/finance/finance.hooks";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import CustomDataTable from "@/components/_core/CustomDataTable";
import HeaderComponent from "@/components/_core/HeaderComponent";
import { Modal } from "@/components/_core/Modal";
import Card from "@/components/ui/card";
import { IncomeBreadTree } from "@/helpers/breadcrumbs";
import { getFinanceCategories } from "@/helpers/dataTableColumns/transactionsColumns";
import { useParams } from "next/navigation";
import { useState } from "react";
import CreateModal from "./CreateModal";

const IncomeMain = () => {
  const params = useParams();
  const type = params?.type as string || "income";

  const transactionColumns = getFinanceCategories();

  const { data: transactions, isPending: isGetingTransactions } = useGetAllTransaction({
    type,
    currPage: 1,
    limit: 50
  });

  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <>
      <BreadcrumbsComponent breadTree={[
        ...IncomeBreadTree,
        { name: type.charAt(0).toUpperCase() + type.slice(1) },
      ]} />

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
          title={`Recent ${type.charAt(0).toUpperCase() + type.slice(1)}s`}
          showSearch
          searchPlaceholder="Search by payer, method, amount"
          filterComponent={<></>}
          createButtonFunction={() => {
            setShowCreateModal(true);
          }}
        />

        <div>
          <CustomDataTable
            columns={transactionColumns}
            data={transactions?.data || []}
            progressPending={isGetingTransactions}
            paginationServer
            totalResults={transactions?.totalResults || 0}
          />
        </div>
      </Card>

      {showCreateModal && (
        <Modal
          isOpen={showCreateModal}
          toggle={() => setShowCreateModal(false)}
          title={`Add New ${type.charAt(0).toUpperCase() + type.slice(1)}`}
          description="Add new transaction details"
          showSubmitButton={false}
          showFooter={false}
          sideClick={true}
          size="xl"
        >
          <CreateModal type={type} />
        </Modal>
      )}
    </>
  );
};

export default IncomeMain;