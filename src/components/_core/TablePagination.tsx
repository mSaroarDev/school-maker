import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface TablePaginationProps {
  totalItems: number;
  currPage: number;
  setCurrPage: (page: number) => void;
  setLimit: (limit: number) => void;
  limit: number;
  itemsPerPageOptions?: number[];
  onChagePage?: (page: number) => void;
}

const TablePagination: React.FC<TablePaginationProps> = (props) => {
  const { 
    totalItems, 
    currPage,
    setCurrPage,
    setLimit,
    limit,
    itemsPerPageOptions = [10, 20, 30, 40, 50],
    onChagePage
  } = props;

  const handlePageChange = (page: number): void => {
    setCurrPage(page);
    if (onChagePage) {
      onChagePage(page);
    }
  };

  const [startCount, setStartCount] = useState<number>(1);
  const [endCount, setEndCount] = useState<number>(10);

  // Calculate total pages
  const totalPages = Math.ceil(totalItems / limit);

  useEffect(() => {
    const newStartCount = (currPage - 1) * limit + 1;
    const newEndCount = Math.min(currPage * limit, totalItems); 

    setStartCount(newStartCount);
    setEndCount(newEndCount);
  }, [currPage, limit, totalItems]);

  // Generate page numbers to display
  const getPageNumbers = () => {
    // For small number of pages, show all
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // For larger number of pages, show current page with neighbors and ellipsis
    if (currPage <= 3) {
      return [1, 2, 3, 4, 5, null, totalPages];
    } else if (currPage >= totalPages - 2) {
      return [1, null, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      return [1, null, currPage - 1, currPage, currPage + 1, null, totalPages];
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <>
      <div className="w-full bg-transparent flex items-center justify-end lg:justify-between gap-5 p-4">
        <span className="hidden lg:block">Items {startCount}-{endCount} of {totalItems}</span>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <p className="text-nowrap w-full">Per_Page</p>
            <select 
              value={limit}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setLimit(Number(e.target.value));
                setCurrPage(1);
              }}
              className="border border-gray-300 rounded-md p-1">
              {itemsPerPageOptions.map((item: number, i: number) => (
                <option value={item} key={i}>{item}</option>
              ))}
            </select>
          </div> 

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currPage > 1) handlePageChange(currPage - 1);
                  }}
                  className={currPage <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {pageNumbers.map((page, index) => (
                page === null ? (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={`page-${page}`}>
                    <PaginationLink 
                      href="#" 
                      isActive={currPage === page}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page as number);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currPage < totalPages) handlePageChange(currPage + 1);
                  }}
                  className={currPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default TablePagination;