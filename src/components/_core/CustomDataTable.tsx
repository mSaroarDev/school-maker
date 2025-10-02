"use client";
// import { darkDataTableStyles, dataTableStyles, mobileLightDataTableStyles, mobileDarkDataTableStyles } from "../../assets/styles/DatatableStyles";
import DataTable, { type TableColumn } from "react-data-table-component";
import { useDeviceDetect } from "@/lib/useDeviceDetect";
import TableSkeleton from "./skeleton/TableSkeleton";
import NoData from "./NoDataa";
import { useTheme } from "next-themes";
import TablePagination from "./TablePagination";
import { darkDataTableStyles, dataTableStyles, mobileDarkDataTableStyles, mobileLightDataTableStyles } from "@/assets/styles/DatatableStyles";

interface IDatatableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  mobileColumns?: TableColumn<T>[];
  customStyles?: object | string | null;
  progressPending?: boolean;
  progressComponent?: React.ReactNode;
  noDataComponent?: React.ReactNode;
  onRowClicked?: (row: T) => void;
  striped?: boolean;
  pointerOnHover?: boolean;
  highlightOnHover?: boolean;
  pagination?: boolean;
  paginationServer?: boolean;
  paginationComponent?: React.ReactNode;
  totalResults?: number;
  // totalItems?: number;
  currPage?: number;
  limit?: number;
  setCurrPage?: (page: number) => void;
  setLimit?: (limit: number) => void;
  itemsPerPageOptions?: number[];
  selectableRows?: boolean;
  extraStyles?: object;
  noHeader?: boolean;
}

const CustomDataTable = <T,>({
  data,
  columns,
  mobileColumns,
  progressPending = false,
  onRowClicked,
  totalResults = 0,
  // totalItems = 0,
  currPage = 1,
  limit = 10,
  setCurrPage = () => { },
  setLimit = () => { },
  itemsPerPageOptions = [10, 20, 50, 100],
  selectableRows = false,
  highlightOnHover = true,
  extraStyles,
  noHeader = false,
  pagination = true,
}: IDatatableProps<T>) => {

  const { isMobile } = useDeviceDetect();
  const { theme } = useTheme();

  // Determine which styles to use based on device and theme
  const customStyles = {
    headRow: {
      style: {
        display: isMobile ? 'none' : '',
        ...(theme === "light" ? dataTableStyles.headRow.style : darkDataTableStyles.headRow.style)
      }
    },
    table: {
      style: {
        backgroundColor: 'transparent',
      }
    },
    tableWrapper: {
      style: {
        backgroundColor: 'transparent',
      }
    }
  };

  const getStyles = () => {
    if (isMobile) {
      return theme === "light" ? mobileLightDataTableStyles : mobileDarkDataTableStyles;
    }
    return theme === "light" ? dataTableStyles : darkDataTableStyles;
  };

  return (
    <div className="w-full overflow-hidden">
      <DataTable
        customStyles={{
          ...getStyles(),
          ...customStyles,
          ...extraStyles
        }}
        columns={isMobile ? mobileColumns ?? [] : columns}
        data={data}
        progressPending={progressPending}
        progressComponent={<TableSkeleton />}
        noDataComponent={<NoData />}
        onRowClicked={onRowClicked || undefined}
        striped={theme === "light" && !isMobile}
        pointerOnHover
        highlightOnHover={highlightOnHover && theme === "light" && !isMobile}
        selectableRows={selectableRows}
        pagination={pagination}
        paginationServer
        paginationComponent={() => TablePagination({
          totalItems: totalResults,
          currPage,
          limit,
          setCurrPage,
          setLimit,
          itemsPerPageOptions
        })}
        noTableHead={noHeader}
      />
    </div>
  );
};

export default CustomDataTable;