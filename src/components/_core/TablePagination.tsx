import { useEffect, useState } from "react";

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

  useEffect(() => {
    const newStartCount = (currPage - 1) * limit + 1;
    const newEndCount = Math.min(currPage * limit, totalItems); 

    setStartCount(newStartCount);
    setEndCount(newEndCount);
  }, [currPage, limit, totalItems]);

  return (
    <>
      <div className="w-full bg-transparent flex items-center justify-end lg:justify-between gap-5 p-4">
        <span className="hidden lg:block">Items {startCount}-{endCount} of {totalItems}</span>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <span>Per Page</span>
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

          {/* <Pagination 
            isCompact
            showControls 
            initialPage={1} 
            total={Math.ceil(totalItems / limit)}
            page={currPage}
            onChange={handlePageChange}
          /> */}
        </div>
      </div>
    </>
  );
};

export default TablePagination;