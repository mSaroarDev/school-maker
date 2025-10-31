"use client";
import { useGetSalaries } from "@/api/salary/salary.hooks";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import CustomDataTable from "@/components/_core/CustomDataTable";
import HeaderComponent from "@/components/_core/HeaderComponent";
import ReactSelect from "@/components/_core/ReactSelect";
import Card from "@/components/ui/card";
import { monthOptions, yearsOptions } from "@/constants/constants";
import { SalaryBreadTree } from "@/helpers/breadcrumbs";
import { salaryDueListColumns } from "@/helpers/dataTableColumns/salaryDueList";
import { useDebounce } from "@/utils/useDebounce";
import moment from "moment";
import { useState } from "react";

const SalaryMain = () => {

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const columns = salaryDueListColumns();

  const [inputs, setInputs] = useState("");

  useDebounce(() => {
    setFilters({
      ...filters,
      search: inputs,
      currPage: 1,
    })
  }, [inputs], 1000);

  const [currPage, setCurrPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const [filters, setFilters] = useState({
    currPage,
    limit,
    search: "",
    payStatus: "Due",
    month: moment(new Date()).format("MMMM"),
    year: moment(new Date()).format("YYYY") as unknown as number,
  });

  const { data: salaries, isPending } = useGetSalaries(filters);

  console.log("filters", filters);
  console.log("inputs", inputs);

  return (
    <>
      <BreadcrumbsComponent breadTree={SalaryBreadTree} />

      <Card>
        <HeaderComponent
          title="Due Fees"
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
                    currPage: 1,
                  });
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
                    currPage: 1,
                  });
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
            totalResults={20}
            currPage={currPage}
            setCurrPage={setCurrPage}
            limit={limit}
            setLimit={setLimit}
          />
        </div>
      </Card>
    </>
  );
};

export default SalaryMain;