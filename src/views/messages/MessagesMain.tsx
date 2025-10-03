"use client";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import CustomDataTable from "@/components/_core/CustomDataTable";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import { MessagesBreadTree } from "@/helpers/breadcrumbs";
import moment from "moment";
import { useState } from "react";
import { FiInbox, FiMoreVertical, FiPlus } from "react-icons/fi";
import { GoInbox } from "react-icons/go";
import { LuCopy, LuNotebookPen, LuRefreshCw } from "react-icons/lu";
import MessageComponse from "./MessageComponse";
import { useAuth } from "@/hooks/useAuth";
import { showToast } from "@/utils/showToast";
import { useGetMessages } from "@/api/messages/messages.hooks";
import { TMessage } from "@/api/messages/messages.types";
import { useRouter, useSearchParams } from "next/navigation";
import { PiPaperPlaneRightBold } from "react-icons/pi";
import MessageDetails from "./MessageDetails";
import TableSkeleton from "@/components/_core/skeleton/TableSkeleton";

const MessagesMain = () => {

  const quillToPlainText = (content: string) => {
    return content.replace(/<[^>]+>/g, "").trim();
  };

  const { user } = useAuth();

  const searchParams = useSearchParams()
  const messageId = searchParams.get('messageId');

  const [showComposeMessage, setShowComposeMessage] = useState(false);
  const toggleComposeMessage = () => setShowComposeMessage(!showComposeMessage);

  const copyText = () => {
    navigator.clipboard.writeText(user?.messageAddress || "");
    showToast("success", `Copied: ${user?.messageAddress}`);
  };

  const [filters, setFilters] = useState({
    currPage: 1,
    limit: 50,
    search: "",
    folder: "inbox",
    type: "received",
    userId: user?._id || "",
  });

  const { data: messages, isPending } = useGetMessages(filters);
  const { push } = useRouter();

  const safeParse = (value: string) => {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  };

  const messageColumns = [
    {
      name: "Sender",
      width: "200px",
      selector: (row: TMessage) =>
        filters.folder === "sent"
          ? (row?.recievers?.join(", ") ?? "")
          : user?.fullName === row?.createdBy?.fullName
            ? "me"
            : row?.createdBy?.fullName ?? "",
    },
    {
      name: "Subject",
      cell: (row: TMessage) => (
        <div className="flex items-center justify-between mr-5">
          <div className="flex items-center gap-2 pr-5">
            <h4 className="font-medium flex-shrink-0">{row.subject}</h4>{" - "}
            <p className="text-sm text-gray-500 line-clamp-1">
              {row?.text ? quillToPlainText(safeParse(row?.text)) : ""}
            </p>
          </div>
        </div>
      ),
    },
    {
      name: "Action",
      width: "100px",
      cell: (row: TMessage) => (
        <div className="flex items-center justify-end gap-3">
          <div className="flex-shrink-0">
            {moment(row.createdAt).fromNow()}
          </div>
          <button className="more-action-button">
            <FiMoreVertical size={16} />
          </button>
        </div>
      )
    }
  ];

  return (
    <>
      <BreadcrumbsComponent breadTree={MessagesBreadTree} />

      <div className="flex items-start gap-5">
        <Card className="w-80 px-0 pb-2">
          <div className="__header flex items-center justify-between mb-4 px-4 pt-4">
            <h3 className="flex items-center gap-2">
              <LuNotebookPen className="flex-shrink-0" size={18} />
              <span className="font-semibold text-base">Messages</span>
            </h3>
          </div>

          <div className="px-4">
            <Button
              onClick={toggleComposeMessage}
              className="w-full"
            >
              <FiPlus size={18} />
              Compose Message
            </Button>
          </div>

          <div className="flex flex-col gap-1 mt-5 pr-3">
            <ul>
              <li
                className={`flex items-center gap-3 cursor-pointer hover:bg-primary/5 px-4 py-2 rounded-r-md ${filters.folder === "inbox" ? "bg-primary/10 font-medium border-s-4 border-primary rounded-r-md" : ""}`}
                onClick={() => {
                  setFilters({ ...filters, folder: "inbox" });
                  push(`/messages?folder=inbox`);
                }}
              >
                <FiInbox className="flex-shrink-0" size={20} />
                <span className="font-medium text-base">Inbox</span>
              </li>

              <li
                className={`flex items-center gap-3 cursor-pointer hover:bg-primary/5 px-4 py-2 rounded-r-md ${filters.folder === "sent" ? "bg-primary/10 font-medium border-s-4 border-primary rounded-r-md" : ""}`}
                onClick={() => {
                  setFilters({ ...filters, folder: "sent" });
                  push(`/messages?folder=sent`);
                }}
              >
                <PiPaperPlaneRightBold className="flex-shrink-0" size={20} />
                <span className="font-medium text-base">Sent</span>
              </li>


            </ul>
          </div>


        </Card>
        <Card className="w-full">
          {messageId ? (
            <>
              <MessageDetails
                messageId={messageId}
              />
            </>
          ) : (
            <div>
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
                    <p>{user?.messageAddress}</p>
                    <button onClick={copyText} className="more-action-button">
                      <LuCopy size={18} />
                    </button>
                  </div>

                </div>
              </div >

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
                  progressPending={isPending}
                  paginationServer
                  noDataComponent="No books found"
                  paginationComponent
                  totalResults={37}
                  noHeader={true}
                  pagination={false}
                  onRowClicked={(row) => {
                    push(`/messages?folder=${filters?.folder}&messageId=${row._id}`)
                    console.log(`/messages?folder=${filters?.folder}&messageId=${row._id}`)
                  }}
                  progressComponent={<TableSkeleton />}
                />
              </div>
            </div >
          )}

        </Card >
      </div >

      {showComposeMessage && (
        <MessageComponse
          setShowComposeMessage={setShowComposeMessage}
        />
      )}
    </>
  );
};

export default MessagesMain;