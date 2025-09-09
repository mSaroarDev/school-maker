import { JSX } from "react";
import { TNoticeResponse } from "@/api/notices/notices.types";
import { GoMegaphone } from "react-icons/go";
import { htmlToPlainText } from "@/utils/htmlToPlainText";

type TNoticeCardProps = {
  item: TNoticeResponse;
  renderTitleAuthor: (title: string, author: string) => JSX.Element;
  renderDate: (dateString: string) => JSX.Element;
  renderViewCount: (count: number) => JSX.Element;
}

const NoticeCard = ({
  item,
  renderTitleAuthor,
  renderDate,
  renderViewCount
}: TNoticeCardProps) => {
  return (
    <>
      <div
        onClick={() => window.open(`/notices/details/${item?._id}?title=${item?.title}`, "_blank")}
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
    </>
  );
};

export default NoticeCard;