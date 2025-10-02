import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/ui/richTextArea";
import { LuNotebookPen } from "react-icons/lu";
import { PiPaperPlaneRight } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import Select from "react-select";

type MessageComponseProps = {
  showComposeMessage: boolean;
  setShowComposeMessage: (show: boolean) => void;
}

const MessageComponse = ({
  showComposeMessage,
  setShowComposeMessage
}: MessageComponseProps) => {
  return (
    <>
      <div
        className="fixed w-[600px] h-[700px] bottom-5 right-5 bg-white border rounded-lg shadow-lg z-50"
      >
        <div
          className="w-full flex items-center justify-between p-4 rounded-t-lg"
        >
          <h3 className="flex items-center gap-2">
            <LuNotebookPen className="flex-shrink-0" size={18} />
            <span className="font-semibold text-base">Compose New Message</span>
          </h3>
          <button
            onClick={() => setShowComposeMessage(false)}
            className="p-1 rounded-full hover:bg-gray-100 cursor-pointer">
            <RxCross2 size={18} />
          </button>
        </div>

        <div className="mt-5 px-4">
          <div>
            <Label>Message To</Label>
            <Select />
          </div>

          <div className="h-[540px] flex flex-col justify-between">
            <div>
              <div className="mt-4">
                <Label>Subject</Label>
                <Input type="text" placeholder="Subject" />
              </div>

              <div>
                <Label className="mt-4">Message</Label>
                <RichTextEditor

                />
              </div>
            </div>

            <div className="mt-4">
              <Button>
                Send
                <PiPaperPlaneRight size={18} />
              </Button>
            </div>
          </div>


        </div>
      </div>
    </>
  );
};

export default MessageComponse;