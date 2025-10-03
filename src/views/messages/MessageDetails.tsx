import { useCreateMessage, useGetMessageById } from "@/api/messages/messages.hooks";
import { TFormdata } from "@/api/messages/messages.types";
import avatar from "@/assets/images/avatar.jpeg";
import Spinner from "@/components/_core/Spinner";
import { Button } from "@/components/ui/button";
import { handleErrorMessage } from "@/utils/handleErrorMessage";
import { showToast } from "@/utils/showToast";
import { MoreVertical } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { HiOutlineUsers, HiReply } from "react-icons/hi";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdOutlineWatchLater } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

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

  const [editing, setEditing] = useState(false);

  const defaultValues: TFormdata = {
      recievers: [],
      label: "primary",
      subject: "",
      text: "",
      folder: "inbox",
    };
  
    const {
      register,
      handleSubmit,
      formState: { errors },
      control,
      setValue,
    } = useForm<TFormdata>({
      defaultValues,
    });

    const {mutateAsync: createMessage, isPending: isCreating} = useCreateMessage();
  
    const onSubmit = async (data: TFormdata) => {
      try {
        const res = await createMessage(data);
        if(res?.success){
          showToast("success", res?.message);
          // setShowComposeMessage(false);
          setEditing(false);
        }
      } catch (error) {
        showToast("error", handleErrorMessage(error));
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
            <div className="w-full">
              <div >
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

              <div className="mt-6 w-full">
                {message?.data?.text && (
                  <div dangerouslySetInnerHTML={{ __html: safeParse(message?.data?.text) }}></div>
                )}
              </div>

              <div>
                {/* Attachments */}
              </div>

              <div className="mt-10">
                {/* Reply */}

                {!editing && (
                  <div className="flex items-center gap-2">
                    <Button 
                      onClick={() => {
                        setEditing(true);
                        setValue("recievers", [message?.data?.createdBy?.messageAddress ?? ""]);
                        setValue("subject", `Re: ${message?.data?.subject}`);
                        setValue("text", "");
                      }} 
                      variant="outline" 
                      className="rounded-full"
                    >
                      <HiReply size={18} />
                      Reply
                    </Button>
                  </div>
                )}

                {editing && (
                  <div className="-mt-5">
                    <hr />
                    <textarea 
                      className="mt-2 w-full border border-gray-300 rounded-md p-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      placeholder="Write your reply..."
                      {...register("text", { required: "Message is required" })}
                      disabled={isCreating}
                    ></textarea>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        type="submit"
                        onClick={handleSubmit(onSubmit)}
                        disabled={isCreating}
                        isLoading={isCreating}
                      >
                        <HiReply size={18} /> Reply
                      </Button>
                      <Button onClick={() => setEditing(false)} variant="outline"><RxCross2 size={18} /> Close</Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageDetails;