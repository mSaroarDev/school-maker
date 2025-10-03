import { useGetMessageById } from "@/api/messages/messages.hooks";
import { MoreVertical } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaRegShareFromSquare, FaUsers } from "react-icons/fa6";
import { HiOutlineUsers, HiReply } from "react-icons/hi";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdOutlineWatchLater } from "react-icons/md";
import avatar from "@/assets/images/avatar.jpeg";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/_core/Spinner";

type MessageDetailsProps = {
  messageId: string;
}

const MessageDetails = ({
  messageId,
}: MessageDetailsProps) => {
  const { back } = useRouter();

  const { data: message, isPending } = useGetMessageById(messageId);
  const safeParse = (value: string) => {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="more-action-button"
            onClick={() => back()}
          >
            <IoArrowBackOutline size={18} />
          </button>

          <span className="text-lg font-medium">Message Details</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div>
            {moment(message?.data?.createdAt).format("LLL")}
          </div>
          <button className="more-action-button">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {isPending ? (
        <div className="py-10 flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="mt-6">
          <h3 className="mt-6 font-semibold text-xl">{message?.data?.subject}</h3>

          <div className="flex items-start gap-3 mt-4">
            <div className="flex-shrink-0 w-12 h-12 relative rounded-full overflow-hidden ring-2 ring-gray-300">
              <Image
                src={message?.data?.createdBy?.avatar ?? avatar}
                alt="avatar"
                fill
              />
            </div>
            <div>
              <div>
                <h2 className="font-medium">{message?.data?.createdBy?.fullName}</h2>
                <p className="flex items-center gap-1 font-medium text-sm text-gray-500">
                  <FaRegShareFromSquare size={16} />
                  {`<${message?.data?.createdBy?.messageAddress}>`}
                </p>
                <p className="mt-1 flex items-center gap-1 font-medium text-sm text-gray-500">
                  <HiOutlineUsers size={16} />
                  {`${message?.data?.recievers?.join(", ")}`}
                </p>
                <p className="mt-1 flex items-center gap-1 font-medium text-sm text-gray-500">
                  <MdOutlineWatchLater size={16} />
                  {`${moment(message?.data?.createdAt).format("LLL")}`}
                </p>
              </div>

              <div className="mt-6 prose max-w-none">
                {message?.data?.text && (
                  <div dangerouslySetInnerHTML={{ __html: safeParse(message?.data?.text) }}></div>
                )}
              </div>

              <div>
                {/* Attachments */}
              </div>

              <div className="mt-10">
                {/* Reply */}
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="rounded-full">
                    <HiReply size={18} />
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageDetails;