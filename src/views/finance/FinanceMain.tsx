"use client";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import CustomDataTable from "@/components/_core/CustomDataTable";
import HeaderComponent from "@/components/_core/HeaderComponent";
import { Modal } from "@/components/_core/Modal";
import RenderStatus from "@/components/_core/RenderStatus";
import Card from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { transactions } from "@/dummy/transactions";
import { FinanceBreadTree } from "@/helpers/breadcrumbs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiEye } from "react-icons/fi";
import { GrStreetView } from "react-icons/gr";
import { MdMoreVert } from "react-icons/md";
import ReviewModal from "./ReviewModal";

const FinanceMain = () => {
  const { push } = useRouter();
  const [showReviewModal, setShowReviewModal] = useState(false);

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
      selector: (row) => row?.Class
    },
    {
      name: "Tution Fee",
      selector: (row) => row?.TutionFee
    },
    {
      name: "Activity Fee",
      selector: (row) => row?.activityFee
    },
    {
      name: "Miscellenous Fee",
      selector: (row) => row?.miscellenousFee
    },
    {
      name: "Amount",
      selector: (row) => row?.Amount
    },
    {
      name: "Status",
      cell: (row) => <RenderStatus status={row?.Status} />
    },
    {
      name: "Action",
      width: "100px",
      cell: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger className="more-action-button">
            <MdMoreVert size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Action</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => window.open(`/finance/reciept/${row?._id}`, "_blank")}
            >
              <FiEye size={18} /> View Reciept
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setShowReviewModal(true)}
            >
              <GrStreetView size={18} /> Review
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      )
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
        <HeaderComponent
          title="Due Fees"
          // createLink="/teachers/create"
          // query={query}
          // setQuery={setQuery}
          filterComponent={<></>}
          showSearch
        />

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