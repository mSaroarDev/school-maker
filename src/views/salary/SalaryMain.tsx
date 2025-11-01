"use client";
import { useGetSalaries, useUpdateStatus } from "@/api/salary/salary.hooks";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import CustomDataTable from "@/components/_core/CustomDataTable";
import HeaderComponent from "@/components/_core/HeaderComponent";
import { Modal } from "@/components/_core/Modal";
import ReactSelect from "@/components/_core/ReactSelect";
import Card from "@/components/ui/card";
import { monthOptions, yearsOptions } from "@/constants/constants";
import { SalaryBreadTree } from "@/helpers/breadcrumbs";
import { salaryDueListColumns } from "@/helpers/dataTableColumns/salaryDueList";
import { useDebounce } from "@/utils/useDebounce";
import moment from "moment";
import { useEffect, useState } from "react";
import UpdateSalaryForm from "./UpdateSalaryForm";
import { showConfirmModal } from "@/utils/showConfirmModal";
import { showToast } from "@/utils/showToast";
import { handleErrorMessage } from "@/utils/handleErrorMessage";
import { TSalary } from "@/api/salary/salary.types";

const SalaryMain = () => {

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [inputs, setInputs] = useState("");

  useDebounce(() => {
    setFilters({
      ...filters,
      search: inputs,
    })
    setCurrPage(1);
  }, [inputs], 1000);

  const [currPage, setCurrPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const [filters, setFilters] = useState({
    search: "",
    payStatus: "Due",
    month: moment(new Date()).subtract(1, "month").format("MMMM"),
    year: moment(new Date()).format("YYYY") as unknown as number,
  });

  const { data: salaries, isPending } = useGetSalaries({
    ...filters,
    currPage,
    limit,
  });

  const [targatedSalary, setTargatedSalary] = useState<TSalary>();
  const { mutateAsync: updateStatus } = useUpdateStatus();

  const [selectedStatus, setSelectedStatus] = useState<{ value: string; label: string }>({
    value: 'Due',
    label: 'Due',
  });

  const handleUpdateStatus = () => {
    showConfirmModal({
      title: 'Confirm?',
      text: "Are you sure you want to update the salary status?",
      func: async () => {
        try {
          const res = await updateStatus({
            id: targatedSalary?._id || "",
            data: {
              payStatus: selectedStatus.value,
            }
          });

          if (res?.success) {
            showToast("success", res?.message || "Status updated successfully");
            setShowUpdateModal(false);
          }
        } catch (error) {
          showToast("error", handleErrorMessage(error));
        }
      }
    })
  };

  const columns = salaryDueListColumns(
    setShowUpdateModal,
    currPage,
    limit,
    setTargatedSalary,
  );

  useEffect(() => {
    if (targatedSalary) {
      setSelectedStatus({
        value: targatedSalary.payStatus,
        label: targatedSalary.payStatus,
      });
    }
  }, [targatedSalary]);

  return (
    <>
      <BreadcrumbsComponent breadTree={SalaryBreadTree} />

      <Card>
        <HeaderComponent
          title="Salary Sheet"
          query={inputs}
          setQuery={setInputs}
          // filterComponent={<></>}
          // createButtonFunction={() => setShowCreateModal(true)}
          showSearch
          extraComponent={(
            <div className="flex items-center gap-2">
              <ReactSelect
                options={monthOptions}
                placeholder="Select Month"
                className="w-[150px]"
                value={monthOptions.find((option) => option.label === filters.month) || null}
                onChange={(option) => {
                  setFilters({
                    ...filters,
                    month: option.label,
                  });
                  setCurrPage(1);
                }}
              />

              <ReactSelect
                options={yearsOptions}
                placeholder="Select Year"
                className="w-[150px]"
                value={yearsOptions.find((option) => Number(option.value) === Number(filters.year)) || null}
                onChange={(option) => {
                  setFilters({
                    ...filters,
                    year: option ? Number(option.value) : new Date().getFullYear(),
                  });
                  setCurrPage(1);
                }}
              />
            </div>
          )}
        />

        <div>
          <CustomDataTable
            columns={columns}
            data={salaries?.data || []}
            progressPending={isPending}
            totalResults={salaries?.totalResults || 0}
            currPage={currPage}
            setCurrPage={setCurrPage}
            limit={limit}
            setLimit={setLimit}
          />
        </div>
      </Card>

      {showUpdateModal && (
        <Modal
          title="Update Salary"
          description="Update the salary status"
          isOpen={showUpdateModal}
          toggle={() => setShowUpdateModal(false)}
          onSubmit={handleUpdateStatus}
        >
          <UpdateSalaryForm
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />
        </Modal>
      )}
    </>
  );
};

export default SalaryMain;