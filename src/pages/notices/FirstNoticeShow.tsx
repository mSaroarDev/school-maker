import React, { JSX } from "react";
import { TNoticeResponse } from "@/api/notices/notices.types";
import { Button } from "@/components/ui/button";
import { htmlToPlainText } from "@/utils/htmlToPlainText";
import { Badge } from "lucide-react";
import { BiPaperPlane } from "react-icons/bi";

type TFirstNoticeShowProps = {
  noticesData: {
    data: TNoticeResponse[];
  },
  renderTitleAuthor: (title: string, author: string) => JSX.Element;
  renderDate: (dateString: string) => JSX.Element;
  renderViewCount: (count: number) => JSX.Element;
};

const FirstNoticeShow = ({
  noticesData,
  renderTitleAuthor,
  renderDate,
  renderViewCount
}: TFirstNoticeShowProps) => {
  return (
    <>
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
    </>
  );
};

export default FirstNoticeShow;