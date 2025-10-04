"use client";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import CustomDataTable from "@/components/_core/CustomDataTable";
import HeaderComponent from "@/components/_core/HeaderComponent";
import RenderStatus from "@/components/_core/RenderStatus";
import Card from "@/components/ui/card";
import { transactions } from "@/dummy/transactions";
import { FinanceBreadTree } from "@/helpers/breadcrumbs";
import Image from "next/image";

const FinanceMain = () => {
  const columns = [
    {
      name: "Student Name",
      cell: (row) => (
        <div className="flex items-center gap-1">
          <div className="flex-shrink-0 w-10 h-10 overflow-hidden rounded-full bg-slate-50 relative">
            <Image 
              src={""}
              alt="Avatar"
              fill
            />
          </div>
          <div>
            <h3 className="font-medium">{row?.studentName}</h3>
            <p>{row?.studentId}</p>
          </div>
        </div>
      )
    },
    {
      name: "Class",
      selector: (row)=> row?.Class
    },
    {
      name: "Tution Fee",
      selector: (row)=> row?.TutionFee
    },
    {
      name: "Activity Fee",
      selector: (row)=> row?.activityFee
    },
    {
      name: "Miscellenous Fee",
      selector: (row)=> row?.miscellenousFee
    },
    {
      name: "Amount",
      selector: (row)=> row?.Amount
    },
    {
      name: "Status",
      cell: (row)=> <RenderStatus status={row?.Status} />
    }
  ];

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
        <HeaderComponent title="Recent Transactions" />

        <div className="mt-5">
          <CustomDataTable
            selectableRows
            columns={columns}
            data={transactions || []}
            progressPending={false}
            paginationServer
            noDataComponent="No books found"
            paginationComponent
            totalResults={transactions.length}
          />
        </div>
      </Card>
    </>
  );
};

export default FinanceMain;