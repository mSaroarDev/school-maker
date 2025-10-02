import { useCreateMessage } from "@/api/messages/messages.hooks";
import { TFormdata } from "@/api/messages/messages.types";
import ErrorLabel from "@/components/_core/ErrorLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/ui/richTextArea";
import { cn } from "@/lib/utils";
import { handleErrorMessage } from "@/utils/handleErrorMessage";
import { showToast } from "@/utils/showToast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuNotebookPen } from "react-icons/lu";
import { PiPaperPlaneRight } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";

type MessageComponseProps = {
  showComposeMessage: boolean;
  setShowComposeMessage: (show: boolean) => void;
}

const MessageComponse = ({
  showComposeMessage,
  setShowComposeMessage
}: MessageComponseProps) => {

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

  const [mail, setMail] = useState("");
  const handlePressButton = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (mail) {
      if (event.key === 'Enter' || event.key === ',') {
        event.preventDefault();
        setValue("recievers", [...control._formValues.recievers, mail]);
        setMail("");
      }
    }
  };

  const [editorContent, setEditorContent] = useState<string>("");
  const handleEditorChange = (value: string) => {
    setEditorContent(value);
    setValue('text', JSON.stringify(value));
  };

  const {mutateAsync: createMessage, isPending} = useCreateMessage();

  const onSubmit = async (data: TFormdata) => {
    try {
      const res = await createMessage(data);
      if(res?.success){
        showToast("success", res?.message);
        setShowComposeMessage(false);
      }
    } catch (error) {
      showToast("error", handleErrorMessage(error));
    }
  };

  return (
    <>
      <div className="fixed w-[600px] h-[700px] bottom-5 right-5 bg-white border rounded-lg shadow-lg z-50">
        <div
          className="w-full h-full flex flex-col justify-between p-4 rounded-t-lg"
        >
          <div className="w-full ">
            <div className="__header flex items-center justify-between mb-4">
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

            <div>
              <div>
                <Label>Message To</Label>
                <div
                  className={cn(
                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                    "mt-1 flex flex-col"
                  )}
                >
                  <div className="flex flex-wrap items-center gap-1">
                    {
                      control._formValues.recievers.map((item: string, index: number) => (
                        <div
                          key={index}
                          className="text-sm text-gray-500 flex items-center justify-center gap-1 px-2 py-1 bg-gray-100 rounded-full"
                        >
                          <span className="px-1">{item}</span>
                          <RxCross2
                            onClick={() => {
                              const filtered = control._formValues.recievers.filter((mail: string) => mail !== item);
                              console.log(filtered);
                              setValue("recievers", filtered, { shouldValidate: true, shouldDirty: true });
                            }}
                            className="text-red-500 flex-shrink-0 cursor-pointer"
                          />
                        </div>))
                    }
                  </div>
                  <input
                    className="w-full border-0 outline-none focus:ring-0 py-2"
                    value={mail}
                    onChange={(e) => { setMail(e.target.value) }}
                    onKeyDown={(e) => handlePressButton(e)}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <div className="mt-4">
                    <Label>Subject</Label>
                    <Input
                      type="text"
                      placeholder="Subject"
                      {...register("subject", { required: "Subject is required" })}
                    />
                    {errors.subject && (
                      <ErrorLabel msg={errors.subject.message as string} />
                    )}
                  </div>

                  <div>
                    <Label className="mt-4">Message</Label>
                    <RichTextEditor
                      value={editorContent}
                      onChange={handleEditorChange}
                      placeholder="Write something..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Button 
              type="submit" 
              onClick={handleSubmit(onSubmit)}
              disabled={isPending}
              isLoading={isPending}
            >
              Send
              <PiPaperPlaneRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageComponse;