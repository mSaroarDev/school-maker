"use client";
import { useGetAllTransaction } from "@/api/finance/finance.hooks";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import CustomDataTable from "@/components/_core/CustomDataTable";
import HeaderComponent from "@/components/_core/HeaderComponent";
import { Modal } from "@/components/_core/Modal";
import Card from "@/components/ui/card";
import { FinanceBreadTree } from "@/helpers/breadcrumbs";
import { getRecentTransactionColumns } from "@/helpers/dataTableColumns/allTransactionColumns";
import { useEffect, useState } from "react";
import ReviewModal from "./ReviewModal";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";

const FinanceMain = () => {
  const [showReviewModal, setShowReviewModal] = useState(false);

  const [currPage, setCurrPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [search, setSearch] = useState<string>("");

  const { data: transactions, isPending: isGetingTransactions } = useGetAllTransaction({
    type: ["income", "expense"],
    status: ["completed", "failed", "rejected"],
    currPage,
    limit,
    startDate,
    endDate,
    search,
  });

  const handleDateChange = (selectedDates: Date[]) => {
    if (selectedDates.length === 1) {
      setStartDate(selectedDates[0]);
    } else if (selectedDates.length === 2) {
      setStartDate(selectedDates[0]);
      setEndDate(selectedDates[1]);
    }
  }

  const columns = getRecentTransactionColumns();

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
          query={input}
          setQuery={setInput}
          extraComponent={(
            <Flatpickr
              onChange={handleDateChange}
              className={`w-full px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Select Date"
              options={{
                dateFormat: "d M, Y",
                maxDate: new Date(),
                enableTime: false,
                mode: "range"
              }}
            />
          )}
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