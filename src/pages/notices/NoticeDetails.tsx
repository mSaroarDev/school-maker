'use client';
import { useGetNoticeById } from "@/api/notices/notices.hooks";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { configs } from "@/configs/configs";

const NoticeDetails = () => {
  const params = useParams();
  const noticeId = params ? params.noticeId : "";

  const {data: notice, isPending} = useGetNoticeById(noticeId as string);

  useEffect(() => {
    document.title = notice ? `${configs?.APP_NAME + " - " + notice?.data?.title}` : "Notice Details";
  }, [notice]);

    return (
        <div>
          <main>
            <h1>Notice Details Page - {noticeId}</h1>
            <pre>{JSON.stringify(notice)}</pre>
          </main>
        </div>
    );
};

export default NoticeDetails;