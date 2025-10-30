"use client";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import CustomDataTable from "@/components/_core/CustomDataTable";
import HeaderComponent from "@/components/_core/HeaderComponent";
import Card from "@/components/ui/card";
import SelectComponent from "@/components/ui/select";
import { monthOptions } from "@/constants/constants";
import { salaryDueListData } from "@/dummy/salary";
import { SalaryBreadTree } from "@/helpers/breadcrumbs";
import { salaryDueListColumns } from "@/helpers/dataTableColumns/salaryDueList";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SalaryMain = () => {

  const {
    control,
    formState: { errors },
  } = useForm({});

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const renderMonthSelect = () => {
    return (
      <SelectComponent
        name="profile.gender"
        errors={errors}
        control={control}
        options={monthOptions}
        rules={{ required: "Gender is required", deps: ["profile.gender"] }}
      />
    )
  };
  
  const columns = salaryDueListColumns();

  return (
    <>
      <BreadcrumbsComponent breadTree={SalaryBreadTree} />

      <Card>
        <HeaderComponent
          title="Due Fees"
          // query={input}
          // setQuery={setInput}
          filterComponent={<></>}
          // createButtonFunction={() => setShowCreateModal(true)}
          showSearch
          extraComponent={renderMonthSelect()}
        />

        <div>
          {/* <CustomDataTable
            columns={columns}
            data={salaryDueListData || []}
            progressPending={false}
            totalResults={20}
          currPage={currPage}
          setCurrPage={setCurrPage}
          limit={limit}
          setLimit={setLimit}
          /> */}
        </div>
      </Card>

      {}
    </>
  );
};

export default SalaryMain;