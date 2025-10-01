"use client";
import { useGetAllBooks } from "@/api/books/books.hooks";
import { TBooks } from "@/api/books/books.types";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import CustomDataTable from "@/components/_core/CustomDataTable";
import HeaderComponent from "@/components/_core/HeaderComponent";
import RenderStatus from "@/components/_core/RenderStatus";
import Card from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LibraryBreadTree } from "@/helpers/breadcrumbs";
import { useAppSelector } from "@/redux/hooks";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { HiTrash } from "react-icons/hi";
import { MdMoreVert } from "react-icons/md";
import CreateDrawer from "./CreateDrawer";

const LibraryMain = () => {
  const { isPending } = useGetAllBooks({
    currPage: 1,
    limit: 10,
  });

  const { push } = useRouter();

  const { books, totalResuls } = useAppSelector((state) => state.books);

  const columns = [
    {
      name: "Book ID",
      selector: (row: TBooks) => row?.bookId || "N/A",
    },
    {
      name: "Book Name",
      cell: (row: TBooks) => <div className="flex items-center gap-2">
        <div className="relative h-12 w-12 rounded overflow-hidden bg-slate-300">
          <Image
            src={row?.coverImage || "/images/placeholder/book-cover.png"}
            alt={row?.bookName}
            fill
            className="object-container"
          />
        </div>
        <h4 className="font-medium line-clamp-2">{row?.bookName}</h4>
      </div>,
    },
    {
      name: "Writer",
      selector: (row: TBooks) => row?.writer || "N/A",
    },
    {
      name: "Subject",
      selector: (row: TBooks) => row?.subject || "N/A",
    },
    {
      name: "Classes",
      cell: (row: TBooks) => row?.classes?.length ? (
        <div className="flex flex-wrap gap-1">
          {row?.classes?.map((cls, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {cls?.displayName || "N/A"}
            </span>
          ))}
        </div>
      ) : "N/A",
    },
    {
      name: "Publish Date",
      cell: (row: TBooks) => moment(row?.createdAt).format("YYYY") || "N/A",
    },
    {
      name: "Status",
      cell: (row: TBooks) => <RenderStatus status={row?.status || "available"} />
    },
    {
      name: "Action",
      width: "100px",
      cell: (row: TBooks) => (
        <DropdownMenu>
          <DropdownMenuTrigger className="more-action-button">
            <MdMoreVert size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Action</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => push(`/teachers/${row?._id}`)}
            >
              <BiEdit size={18} /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              // onClick={() => handleUpdateTeacher(row?._id ? row._id : "")}
            >
              <HiTrash size={18} /> Delete
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  const [showCreatDrawer, setShowCreateDrawer] = useState(false);

  return (
    <>
      <BreadcrumbsComponent
        breadTree={LibraryBreadTree}
      />

      <Card>
        <HeaderComponent
          title="Library"
          createButtonFunction={() => setShowCreateDrawer(true)}
          showSearch
          searchPlaceholder="Search books..."
        />

        <div className="mt-5">
          {totalResuls > 0 ? (
            <>
              <div className="mb-1">
                <CustomDataTable
                  selectableRows
                  columns={columns}
                  data={books}
                  progressPending={isPending}
                  paginationServer
                  noDataComponent="No books found"
                  paginationComponent
                  totalResults={totalResuls}
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </Card>

      {showCreatDrawer && (
        <CreateDrawer
          showModal={showCreatDrawer}
          setShowModal={setShowCreateDrawer}
        />
      )}
    </>
  );
};

export default LibraryMain;