"use client";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import CustomDataTable from "@/components/_core/CustomDataTable";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import { messages } from "@/data/messages";
import { MessagesBreadTree } from "@/helpers/breadcrumbs";
import moment from "moment";
import { FiMoreVertical, FiPlus } from "react-icons/fi";
import { GoInbox } from "react-icons/go";
import { LuCopy, LuRefreshCw } from "react-icons/lu";

const MessagesMain = () => {

  const messageColumns = [
    {
      name: "Sender",
      width: "200px",
      selector: (row: any) => row.sender.fullName,
    },
    {
      name: "Subject",
      cell: (row: any) => (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">{row.subject}</h4>{" - "}
            <p className="text-sm text-gray-500 line-clamp-1">{row.body}</p>
          </div>
          <div className="flex items-center gap-3">
            <div>
              {moment(row.createdAt).fromNow()}
            </div>
            <button className="more-action-button">
              <FiMoreVertical size={16} />
            </button>
          </div>
        </div>
      ),
    }
  ]

  return (
    <>
      <BreadcrumbsComponent
        breadTree={MessagesBreadTree}
      />

      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <button className="">
              <input type="checkbox" />
            </button>

            <button className="">
              <LuRefreshCw size={18} />
            </button>

            <button className="">
              <FiMoreVertical size={18} />
            </button>

            <div className="flex items-center gap-2">
              <p>msaroar@school-maker.com</p>
              <button className="more-action-button">
                <LuCopy size={18} /> 
              </button>
            </div>

          </div>
          <div>
            <Button>
              <FiPlus size={18} />
              Compose Message
            </Button>
          </div>
        </div>

        <div className="flex items-center border-b border-gray-100">
          <button className="px-5 py-3 border-b-2 border-primary flex items-center gap-2 cursor-pointer">
            <GoInbox size={18} />
            Primary
          </button>
        </div>

        <div className="max-h-[calc(100vh-300px)] overflow-auto">
          <CustomDataTable
            selectableRows
            columns={messageColumns}
            data={messages?.data || []}
            progressPending={false}
            paginationServer
            noDataComponent="No books found"
            paginationComponent
            totalResults={37}
            noHeader={true}
            pagination={false}
          />
        </div>
      </Card>
    </>
  );
};

export default MessagesMain;