"use client";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import CustomDataTable from "@/components/_core/CustomDataTable";
import HeaderComponent from "@/components/_core/HeaderComponent";
import RenderStatus from "@/components/_core/RenderStatus";
import Card from "@/components/ui/card";
import { transactionsIncomes } from "@/dummy/incomes";
import { IncomeBreadTree } from "@/helpers/breadcrumbs";
import { useParams } from "next/navigation";
import { useState } from "react";
import CreateModal from "./CreateModal";
import { Modal } from "@/components/_core/Modal";

const IncomeMain = () => {
  const params = useParams();
  const type = params?.type as string || "income";

  const transactionColumns = [
    {
      name: "Invoice ID",
      selector: (row) => row?.invoiceId
    },
    {
      name: "Payer",
      selector: (row) => row?.payer
    },
    {
      name: "Date",
      selector: (row) => row?.date
    },
    {
      name: "Method",
      selector: (row) => row?.method
    },
    {
      name: "Paid From",
      selector: (row) => row?.paidFrom
    },
    {
      name: "Amount",
      selector: (row) => row?.amount
    },
    {
      name: "Status",
      width: "120px",
      cell: (row) => <RenderStatus status={row?.status} />
    }
  ];

  // data
  const incomes = transactionsIncomes.filter(item => item.type === "income");
  const expenses = transactionsIncomes.filter(item => item.type === "expense");

  const isIncome = type === "income";
  const isExpense = type === "expense";

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
            selectableRows
            columns={transactionColumns}
            data={type === "income" ? incomes : expenses || []}
            progressPending={false}
            paginationServer
            noDataComponent="No books found"
            paginationComponent
            totalResults={50}
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