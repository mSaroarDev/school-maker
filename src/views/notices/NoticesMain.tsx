"use client";
import { useGetAllNotice } from "@/api/notices/notices.hooks";
import { TNoticeResponse } from "@/api/notices/notices.types";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import HeaderComponent from "@/components/_core/HeaderComponent";
import { Badge } from "@/components/ui/badge";
import Card from "@/components/ui/card";
import { NoticesBreadTree } from "@/helpers/breadcrumbs";
import { useAuth } from "@/hooks/useAuth";
import CreateNotice from "@/views/notices/CreateNotice";
import moment from "moment";
import { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import FirstNoticeShow from "./FirstNoticeShow";
import NoticeCard from "./NoticeCard";

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
                <NoticeCard
                  key={index}
                  item={item}
                  renderTitleAuthor={renderTitleAuthor}
                  renderDate={renderDate}
                  renderViewCount={renderViewCount}
                />
              ))}
            </div>
            <FirstNoticeShow
              noticesData={noticesData}
              renderTitleAuthor={renderTitleAuthor}
              renderDate={renderDate}
              renderViewCount={renderViewCount}
            />
          </div>
        </Card>
      </div>
    </>
  );
};

export default NoticesMain;