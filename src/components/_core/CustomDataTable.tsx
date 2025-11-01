"use client";
import DataTable, { type TableColumn } from "react-data-table-component";
import { useDeviceDetect } from "@/lib/useDeviceDetect";
import TableSkeleton from "./skeleton/TableSkeleton";
import NoData from "./NoDataa";
import { useTheme } from "next-themes";
import TablePagination from "./TablePagination";
import {
  darkDataTableStyles,
  dataTableStyles,
  mobileDarkDataTableStyles,
  mobileLightDataTableStyles
} from "@/assets/styles/DatatableStyles";

interface IDatatableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  mobileColumns?: TableColumn<T>[];
  progressPending?: boolean;
  onRowClicked?: (row: T) => void;
  totalResults?: number;
  currPage?: number;
  limit?: number;
  setCurrPage?: (page: number) => void;
  setLimit?: (limit: number) => void;
  itemsPerPageOptions?: number[];
  selectableRows?: boolean;
  highlightOnHover?: boolean;
  extraStyles?: object;
  noHeader?: boolean;
  pagination?: boolean;
}

const CustomDataTable = <T,>({
  data,
  columns,
  mobileColumns,
  progressPending = false,
  onRowClicked,
  totalResults = 0,
  currPage = 1,
  limit = 10,
  setCurrPage = () => {},
  setLimit = () => {},
  itemsPerPageOptions = [10, 20, 50, 100],
  selectableRows = false,
  highlightOnHover = true,
  extraStyles,
  noHeader = false,
  pagination = true,
}: IDatatableProps<T>) => {
  const { isMobile } = useDeviceDetect();
  const { theme } = useTheme();

  const getStyles = () => {
    if (isMobile) {
      return theme === "light" ? mobileLightDataTableStyles : mobileDarkDataTableStyles;
    }
    return theme === "light" ? dataTableStyles : darkDataTableStyles;
  };

  return (
    <div className="w-full overflow-hidden">
      <DataTable
        customStyles={{ ...getStyles(), ...extraStyles }}
        columns={isMobile ? mobileColumns ?? [] : columns}
        data={data}
        progressPending={progressPending}
        progressComponent={<TableSkeleton />}
        noDataComponent={<NoData />}
        onRowClicked={onRowClicked || undefined}
        pointerOnHover
        highlightOnHover={highlightOnHover && theme === "light" && !isMobile}
        selectableRows={selectableRows}
        pagination={pagination}
        paginationServer
        paginationComponent={() => (
          <TablePagination
            totalItems={totalResults}
            currPage={currPage}
            limit={limit}
            setCurrPage={setCurrPage}
            setLimit={setLimit}
            itemsPerPageOptions={itemsPerPageOptions}
          />
        )}
        noTableHead={noHeader}
      />
    </div>
  );
};

export default CustomDataTable;
