"use client";
import { useGetAllTransaction } from "@/api/finance/finance.hooks";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import CustomDataTable from "@/components/_core/CustomDataTable";
import HeaderComponent from "@/components/_core/HeaderComponent";
import { Modal } from "@/components/_core/Modal";
// import RenderStatus from "@/components/_core/RenderStatus";
import Card from "@/components/ui/card";
import { IncomeBreadTree } from "@/helpers/breadcrumbs";
import { useParams } from "next/navigation";
import { useState } from "react";
import CreateModal from "./CreateModal";
// import { TTransactions } from "@/api/finance/finance.types";

const IncomeMain = () => {
  const params = useParams();
  const type = params?.type as string || "income";

  // const transactionColumns = [
  //   {
  //     name: "Invoice ID",
  //     selector: (row: TTransactions) => row?._id
  //   },
  //   {
  //     name: "Payer",
  //     selector: (row: TTransactions) => row?.transferedFrom
  //   },
  //   {
  //     name: "Date",
  //     selector: (row: TTransactions) => row?.updatedAt
  //   },
  //   {
  //     name: "Method",
  //     selector: (row: TTransactions) => row?.category
  //   },
  //   {
  //     name: "Paid From",
  //     selector: (row: TTransactions) => row?.transferedFrom
  //   },
  //   {
  //     name: "Amount",
  //     // selector: (row: TTransactions) => row?.amounts?.reduce((acc, curr) => acc + curr.amount, 0)
  //   },
  //   {
  //     name: "Status",
  //     width: "120px",
  //     cell: (row: TTransactions) => <RenderStatus status={row?.status} />
  //   }
  // ];

  // data
  // const incomes = transactionsIncomes.filter(item => item.type === "income");
  // const expenses = transactionsIncomes.filter(item => item.type === "expense");

  // const isIncome = type === "income";
  // const isExpense = type === "expense";

  const {data: transactions, isPending: isGetingTransactions} = useGetAllTransaction({
    type,
    currPage: 1,
    limit: 50
  });

  console.log("transactions", transactions);

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
          {/* <CustomDataTable
            selectableRows
            columns={transactionColumns}
            data={transactions?.data || []}
            progressPending={isGetingTransactions}
            paginationServer
          /> */}
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