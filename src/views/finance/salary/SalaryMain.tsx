"use client";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import CustomDataTable from "@/components/_core/CustomDataTable";
import HeaderComponent from "@/components/_core/HeaderComponent";
import Card from "@/components/ui/card";
import { salaryDueListData } from "@/dummy/salary";
import { SalaryBreadTree } from "@/helpers/breadcrumbs";
import { salaryDueListColumns } from "@/helpers/dataTableColumns/salaryDueList";

const SalaryMain = () => {
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
        />

        <div>
          <CustomDataTable
            columns={salaryDueListColumns()}
            data={salaryDueListData || []}
            progressPending={false}
            totalResults={20}
            // currPage={currPage}
            // setCurrPage={setCurrPage}
            // limit={limit}
            // setLimit={setLimit}
          />
        </div>
      </Card>
    </>
  );
};

export default SalaryMain;