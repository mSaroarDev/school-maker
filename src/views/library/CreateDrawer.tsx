import { useCreateBooks } from "@/api/books/books.hooks";
import { useGetAllClasses } from "@/api/class/class.hooks";
import Drawer from "@/components/_core/Drawer";
import ErrorLabel from "@/components/_core/ErrorLabel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectComponent from "@/components/ui/select";
import { handleErrorMessage } from "@/utils/handleErrorMessage";
import { showToast } from "@/utils/showToast";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiTrash } from "react-icons/hi";

type ICreateDrawerProps = {
  showModal?: boolean;
  setShowModal?: (value: boolean) => void;
};

const CreateDrawer = ({
  showModal = false,
  setShowModal = () => { },
}: ICreateDrawerProps) => {
  const [imgUrl, setFileUrl] = useState<string>("");
  const {data: classes, isPending} = useGetAllClasses();

  const defaultValues = {
    bookId: "",
    bookName: "",
    writer: "",
    subject: "",
    classes: [] as string[],
    coverImage: "",
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
    reset
  } = useForm({
    defaultValues
  });

  const {mutateAsync: creatBook, isPending: isCreating} = useCreateBooks();
  const onSubmit = async (data: typeof defaultValues) => {
    try {
      const res = await creatBook(data);
      if (res?.success) {
        showToast("success", res?.message || "Book Created");
        setShowModal(false);
        reset();
      }
    } catch (error) {
      showToast("error", handleErrorMessage(error));
    }
  }

  return (
    <>
      <Drawer
        showModal={showModal}
        setShowModal={setShowModal}
        title="Add New Book"
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isCreating}
        description="Add new book to the library"
      >
        <div>
          <div>
            <Label className="mt-2">Book Id</Label>
            <Input
              type="text"
              placeholder="Enter Book Id"
              className={`mt-2 ${errors.bookId ? "border-red-500" : ""}`}
              {...register("bookId", { required: "Book Id is required" })}
            />
            {errors.bookId && (<ErrorLabel msg={errors.bookId.message} />)}
          </div>
          <div>
            <Label className="mt-2">Book Name</Label>
            <Input
              type="text"
              placeholder="Enter Book Name"
              {...register("bookName", { required: "Book Name is required" })}
              className={`mt-2 ${errors.bookName ? "border-red-500" : ""}`}
            />
            {errors.bookName && (<ErrorLabel msg={errors.bookName.message} />)}
          </div>
          <div>
            <Label className="mt-2">Writer Name</Label>
            <Input
              type="text"
              placeholder="Enter Writer Name"
              {...register("writer", { required: "Writer Name is required" })}
              className={`mt-2 ${errors.writer ? "border-red-500" : ""}`}
            />
            {errors.writer && (<ErrorLabel msg={errors.writer.message} />)}
          </div>
          <div>
            <Label className="mt-2">Subject</Label>
            <Input
              type="text"
              placeholder="Enter Subject"
              {...register("subject", { required: "Subject is required" })}
              className={`mt-2 ${errors.subject ? "border-red-500" : ""}`}
            />
            {errors.subject && (<ErrorLabel msg={errors.subject.message} />)}
          </div>
          <div>
            <Label className="mt-2 mb-1">Classes</Label>
            <SelectComponent 
              control={control}
              name="classes"
              options={classes?.data?.map((cls) => ({
                label: cls?.displayName,
                value: cls?._id,
              })) || []}
              isMulti
              placeholder="Select Classes"
              className=""
              rules={{ required: "Select at least one class" }}
              isLoading={isPending}
            />
          </div>

          <div className="w-full">
            <Label className="mt-2 mb-1">Cover Image</Label>
            <CldUploadButton
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              options={{ maxFiles: 1, singleUploadAutoClose: false, sources: ["local", "google_drive"] }}
              onSuccess={(result) => {
                console.log("Upload Success: ", result.info);
                if (typeof result.info === "object" && "secure_url" in result.info) {
                  setFileUrl((result.info as { secure_url: string }).secure_url || "");
                  setValue("coverImage", (result.info as { secure_url: string }).secure_url || "");
                } else {
                  setValue("coverImage", "");
                }
              }}
              onError={(error) => {
                console.error("Upload Error: ", error);
              }}
              className="w-full"
            >
              <div className="w-full h-40 border-2 border-dashed border-primary/40 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer hover:bg-primary/10 transition">
                {imgUrl ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={imgUrl}
                      alt="Uploaded Image"
                      fill
                      className="object-contain w-full h-full"
                    />

                    <span className="p-2 top-0 right-0 absolute bg-white rounded-bl-lg text-red-500 hover:bg-red-100 cursor-pointer" onClick={(e) => {
                      e.stopPropagation();
                      setFileUrl("");
                      setValue("coverImage", "");
                    }}>
                      <HiTrash size={20} />
                    </span>
                  </div>
                ) : (
                  <span className="text-primary/40">Click to upload image</span>
                )}
              </div>
            </CldUploadButton>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default CreateDrawer;