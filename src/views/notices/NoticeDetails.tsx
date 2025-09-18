'use client';
import { useGetNoticeById } from "@/api/notices/notices.hooks";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import { Badge } from "@/components/ui/badge";
import Card from "@/components/ui/card";
import { configs } from "@/configs/configs";
import { NoticeDetailsBreadTree } from "@/helpers/breadcrumbs";
import moment from "moment";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import dynamic from 'next/dynamic';

const NoticeDetails = () => {
  const params = useParams();
  const noticeId = params ? params.noticeId : "";

  const { data: notice } = useGetNoticeById(noticeId as string);
  console.log("notice details:", notice); 

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = notice ? `${configs?.APP_NAME + " - " + notice?.data?.title}` : "Notice Details";
    }
  }, [notice]);

  return (
    <div className="mt-5">
      <main>
        <div>
          <BreadcrumbsComponent breadTree={NoticeDetailsBreadTree} />
        </div>

        <Card>
          <h1 className="font-semibold text-3xl">{notice?.data?.title}</h1>
          <p className="capitalize my-2">By {notice?.data?.createdBy?.fullName}, {notice?.data?.createdBy?.role}</p>
          <p className="capitalize">Published at <Badge variant="secondary" className="ml-2">{moment(notice?.data?.createdAt.toString()).format("DD MMM, YYYY")}</Badge></p>

          <div className="mt-5">
            <div dangerouslySetInnerHTML={{ __html: notice?.data?.description || "" }} />
          </div>
        </Card>
      </main>
    </div>
  );
};

export default dynamic(() => Promise.resolve(NoticeDetails), { ssr: false });