import { useGetMessageById } from "@/api/messages/messages.hooks";
import { MoreVertical } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

type MessageDetailsProps = {
  messageId: string;
}

const MessageDetails = ({
  messageId,
}: MessageDetailsProps) => {
  const { back } = useRouter();

  const { data: message, isPending } = useGetMessageById(messageId);

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

          {message?.data?.subject && (
            <h4 className="text-lg font-medium">{message?.data?.subject}</h4>
          )}
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
    </>
  );
};

export default MessageDetails;