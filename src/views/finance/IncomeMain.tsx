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
import { useEffect, useState } from "react";
import CreateModal from "./CreateModal";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import IncomeChart from "./charts/IncomeChart";

const IncomeMain = () => {
  const params = useParams();
  const type = params?.type as string || "income";

  const transactionColumns = getFinanceCategories();

  const [currPage, setCurrPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [search, setSearch] = useState<string>("");
  const { data: transactions, isPending: isGetingTransactions } = useGetAllTransaction({
    type,
    currPage,
    limit,
    startDate,
    endDate,
    search,
  });

  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleDateChange = (selectedDates: Date[]) => {
    if (selectedDates.length === 1) {
      setStartDate(selectedDates[0]);
    } else if (selectedDates.length === 2) {
      setStartDate(selectedDates[0]);
      setEndDate(selectedDates[1]);
    }
  };

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
      <BreadcrumbsComponent breadTree={[
        ...IncomeBreadTree,
        { name: type.charAt(0).toUpperCase() + type.slice(1) },
      ]} />

      <div>
        <div className="grid grid-cols-12 gap-5">
          <Card className="col-span-6 lg:col-span-8">
            <IncomeChart type={type} />
          </Card>
          <div className="col-span-6 lg:col-span-4 grid grid-cols-2 gap-5">
            <div className="bg-primary-light p-3 rounded-lg h-32"></div>
            <div className="bg-primary-light p-3 rounded-lg h-32"></div>
            <div className="bg-primary-light p-3 rounded-lg h-32"></div>
            <div className="bg-primary-light p-3 rounded-lg h-32"></div>
          </div>
        </div>
      </div>

      <Card className="mt-5">
        <HeaderComponent
          title={`Recent ${type.charAt(0).toUpperCase() + type.slice(1)}s`}
          showSearch
          query={input}
          setQuery={setInput}
          searchPlaceholder="Search by payer, method, amount"
          filterComponent={<></>}
          createButtonFunction={() => {
            setShowCreateModal(true);
          }}
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
        />

        <div>
          <CustomDataTable
            columns={transactionColumns}
            data={transactions?.data || []}
            progressPending={isGetingTransactions}
            totalResults={transactions?.totalResults || 0}
            currPage={currPage}
            setCurrPage={setCurrPage}
            limit={limit}
            setLimit={setLimit}
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