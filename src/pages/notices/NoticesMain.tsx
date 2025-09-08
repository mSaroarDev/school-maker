"use client";
import { useGetAllNotice } from "@/api/notices/notices.hooks";
import { TNoticeResponse } from "@/api/notices/notices.types";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import HeaderComponent from "@/components/_core/HeaderComponent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import { NoticesBreadTree } from "@/helpers/breadcrumbs";
import { useAuth } from "@/hooks/useAuth";
import CreateNotice from "@/pages/notices/CreateNotice";
import { htmlToPlainText } from "@/utils/htmlToPlainText";
import moment from "moment";
import { useEffect, useState } from "react";
import { BiPaperPlane } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa6";
import { GoMegaphone } from "react-icons/go";

const NoticesMain = () => {
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const renderDate = (dateString: string) => (
    <Badge variant="secondary">{moment(dateString).format("DD MMM, YYYY")}</Badge>
  );

  const renderViewCount = (count: number) => (
    <span className="flex items-center gap-1 text-xs text-gray-400"><FaRegEye size={16} /> {count || 0}</span>
  );

  const renderTitleAuthor = (title: string, author: string) => (
    <div>
      <h1 className="text-base font-medium">{title}</h1>
      <p className="text-xs text-gray-500 capitalize">{author}</p>
    </div>
  );

  const {
    data: noticesData,
    // isPending: noticesLoading,
  } = useGetAllNotice({
    currPage: 1,
    limit: 10,
    instituteId: user?.instituteId || "",
    search: search
  });

  useEffect(() => {
    setTimeout(() => {
      setSearch(query);
    }, 1000);
  }, [query]);

  return (
    <>
      <div>
        <div>
          <BreadcrumbsComponent breadTree={NoticesBreadTree} showBackButton />
        </div>

        <Card className="h-[calc(100vh-170px)] overflow-hidden">
          <HeaderComponent
            title="Notice Board"
            showSearch
            query={query}
            setQuery={setQuery}
            extraComponent={<>
              <CreateNotice />
            </>}
          />

          <div className="mt-5 grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-8 lg:col-span-9 overflow-y-auto h-[calc(100vh-250px)] pr-2">
              {noticesData?.data?.map((item: TNoticeResponse, index: number) => (
                <div
                  onClick={() => window.open(`/notices/details/${noticesData?.data[0]?._id}?title=${noticesData?.data[0]?.title}`, "_blank")}
                  key={index}
                  className="p-4 rounded-xl border mb-4 cursor-pointer hover:bg-primary/10 hover:shadow-md hover:border-primary/30 transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-primary/20">
                        <GoMegaphone size={22} className="text-black -rotate-12" />
                      </div>
                      {renderTitleAuthor(item?.title, `By ${item?.createdBy?.fullName}, ${item?.createdBy?.role ? `${item?.createdBy?.role}` : ""}`)}

                      <div className="md:hidden flex items-center gap-2">
                        {renderDate(item?.createdAt?.toString())}
                        {renderViewCount(0)}
                      </div>
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                      {renderDate(item?.createdAt?.toString())}
                      {renderViewCount(0)}
                    </div>
                  </div>

                  <p className="mt-5 line-clamp-2 text-gray-700 dark:text-gray-500">
                    {htmlToPlainText(item?.description || "")}
                  </p>
                </div>
              ))}
            </div>
            <div className="hidden col-span-12 md:col-span-4 lg:col-span-3 border rounded-lg p-4 h-[calc(100vh-250px)]  lg:flex flex-col justify-between">
              <div>
                <div>
                  <div className="w-full h-52 rounded-lg overflow-hidden relative bg-slate-100">
                    {/* <Image 
                        src={placeholder}
                        fill
                        alt="avatar"
                        className="object-cover"
                      /> */}
                  </div>
                  <div className="mt-3">
                    {renderTitleAuthor(noticesData?.data[0]?.title, `By ${noticesData?.data[0]?.createdBy?.fullName}, ${noticesData?.data[0]?.createdBy?.role ? `${noticesData?.data[0]?.createdBy?.role}` : ""}`)}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  {renderDate("2025-08-01")}
                  {renderViewCount(1200)}
                </div>

                <div className="mt-4">
                  <p className="text-gray-700 dark:text-gray-500 text-sm line-clamp-3 3xl:line-clamp-6">
                    {htmlToPlainText(noticesData?.data[0]?.description || "")}
                  </p>
                </div>
              </div>
              <div className="mt-auto">
                <h3 className="font-medium">Tags</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="px-2 rounded-full text-xs bg-primary/20 text-primary">#welcome</Badge>
                </div>

                <Button onClick={() => window.open(`/notices/details/${noticesData?.data[0]?._id}?title=${noticesData?.data[0]?.title}`, "_blank")} className="rounded-full w-full mt-4 bg-primary/30 text-black">
                  Read Full Notice <BiPaperPlane size={18} />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default NoticesMain;