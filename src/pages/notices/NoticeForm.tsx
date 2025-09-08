import { useCreateNotice } from "@/api/notices/notices.hooks";
import { TNoticeCreatePayload } from "@/api/notices/notices.types";
import ErrorLabel from "@/components/_core/ErrorLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/ui/richTextArea";
import {
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { handleErrorMessage } from "@/utils/handleErrorMessage";
import { showToast } from "@/utils/showToast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuEye } from "react-icons/lu";

const NoticeForm = ({

}) => {

  const [editorContent, setEditorContent] = useState<string>("");

  const { mutateAsync: createNotice, isPending: isCreating } = useCreateNotice();

  const defaultValues = {
    title: '',
    description: "",
    fileUrl: ''
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue
  } = useForm({
    defaultValues
  });

  const handleEditorChange = (value: string) => {
    setEditorContent(value);
    setValue('description', JSON.stringify(value));
  };

  const [fileUrl, setFileUrl] = useState<string>("");
  const handleImageUpload = (file: File) => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');
      fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`, {
        method: 'POST',
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          console.log("Upload Success: ", data);
          if (data.secure_url) {
            setValue("fileUrl", data.secure_url);
            setFileUrl(data.secure_url);
          } else {
            setValue("fileUrl", "");
          }
        })
        .catch(err => {
          console.error("Upload Error: ", err);
          setValue("fileUrl", "");
        });
    } else {
      setValue("fileUrl", "");
    }
  }

  const onSubmit = async (data: TNoticeCreatePayload) => {
    try {
      const res = await createNotice(data);
      if (res?.success) {
        showToast("success", res.message || "Notice created successfully");
      }
    } catch (error) {
      showToast("error", handleErrorMessage(error) || "Failed to create notice");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
        <SheetHeader>
          <SheetTitle>Create Notice</SheetTitle>
          <SheetDescription>
            Create a new notice and share with everyone.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Title</Label>
            <Input
              {...register('title', { required: 'Title is required' })}
              id="sheet-demo-name"
              placeholder="Enter title"
              disabled={isSubmitting}
              autoComplete="off"
              className={`${errors.title ? 'border-red-500' : ''}`}
            />
            {errors.title && <ErrorLabel msg={errors.title.message} />}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Description</Label>
            <RichTextEditor
              value={editorContent}
              onChange={handleEditorChange}
              placeholder="Write something..."
            />
          </div>
          <div className="grid gap-3 mt-16">
            <Label notRequired>Attachment <span className="text-green-500 text-xs">(Optional)</span></Label>
            {fileUrl ? (
              <Button
                className="bg-primary/20 text-black"
                onClick={() => window.open(fileUrl, "_blank")}
              >
                <LuEye size={20} /> View File
              </Button>
            ) : (
              <input
                type="file"
                className="more-action-button bg-primary/10 text-primary w-full"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if(!file){
                    setValue("fileUrl", "");
                  }
                  handleImageUpload(file ?? new File([], ''));
                }}
              />
            )}

          </div>
        </div>


        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button type="button" variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </form>
    </>
  );
};

export default NoticeForm;