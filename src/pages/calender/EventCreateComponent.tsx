import { useCreateEvent } from "@/api/events/events.hooks";
import { TCreateEventPayload } from "@/api/events/events.types";
import ErrorLabel from "@/components/_core/ErrorLabel";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/ui/richTextArea";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { addEvent } from "@/redux/features/calender/calender.slice";
import { useAppDispatch } from "@/redux/hooks";
import { handleErrorMessage } from "@/utils/handleErrorMessage";
import { showToast } from "@/utils/showToast";
import "flatpickr/dist/themes/light.css";
import moment from "moment";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import Flatpickr from "react-flatpickr";
import { useForm } from "react-hook-form";
import { HiTrash } from "react-icons/hi";
import { LuPlus } from "react-icons/lu";

const EventCreateComponent = () => {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const items = [
    {
      id: "Teachers",
      label: "Teachers",
    },
    {
      id: "Students",
      label: "Students",
    },
    {
      id: "Staffs",
      label: "Staffs",
    },
    {
      id: "Committee",
      label: "Committee",
    },
    {
      id: "Parents",
      label: "Parents",
    },
    {
      id: "Guardians",
      label: "Guardians",
    },
  ] as const;

  const defaultValues = {
    "title": "",
    "category": "",
    "color": "#FF5733",
    "description": "",
    "date": "",
    "time": "",
    "location": "",
    "joinees": [] as string[],
    "image": ""
  }

  const [imgUrl, setFileUrl] = useState<string>("");
  const [editorContent, setEditorContent] = useState<string>("");
  const handleEditorChange = (value: string) => {
    setEditorContent(value);
    setValue('description', JSON.stringify(value));
  };

  const { mutateAsync: createEvent, isPending } = useCreateEvent();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    defaultValues,
    mode: 'onBlur'
  });

  const onSubmit = async (data: TCreateEventPayload) => {
    try {
      const res = await createEvent(data);
      if (res?.success) {
        showToast("success", res?.message || "Event created successfully");
        dispatch(addEvent(res?.data));
        setShowModal(false);
        reset(defaultValues);
      }
    } catch (error) {
      showToast("error", handleErrorMessage(error) || "Failed to create event");
    }
  }

  return (
    <>
      <Sheet open={showModal} modal={false}>
        <SheetTrigger asChild>
          <button onClick={() => setShowModal(true)} className="header-buttons"><LuPlus size={18} /></button>
        </SheetTrigger>
        <SheetContent className="overflow-y-auto">
          <>
            <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
              <SheetHeader>
                <SheetTitle>Create Notice</SheetTitle>
                <SheetDescription>
                  Create a new notice and share with everyone.
                </SheetDescription>
              </SheetHeader>
              <div className="grid flex-1 auto-rows-min gap-4 px-4">
                <div className="grid gap-1">
                  <Label htmlFor="sheet-demo-name">Title</Label>
                  <Input
                    {...register('title', { required: 'Title is required' })}
                    placeholder="Event Title"
                    className={`${errors.title ? 'border-red-500' : ''}`}
                  />
                  {errors.title && <ErrorLabel msg={errors.title.message} />}
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="sheet-demo-name">Category</Label>
                  <Input
                    {...register('category', { required: 'Category is required' })}
                    placeholder="Event Category"
                    className={`${errors.category ? 'border-red-500' : ''}`}
                  />
                  {errors.category && <ErrorLabel msg={errors.category.message} />}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="sheet-demo-username">Description</Label>
                  <RichTextEditor
                    value={editorContent}
                    onChange={handleEditorChange}
                    placeholder="Write something..."
                  />
                </div>
                <div className="grid gap-1 mt-16">
                  <Label htmlFor="sheet-demo-name">Date</Label>
                  <Flatpickr
                    onChange={(selectedDates) => {
                      const selectedDate = selectedDates[0];
                      const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
                      setValue("date", formattedDate as unknown as string);
                    }}
                    className={`w-full px-3 py-2 border ${errors?.date ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Select Date"
                    options={{
                      dateFormat: "d M, Y",
                      enableTime: false,
                      mode: "single",
                    }}
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="sheet-demo-name">Time</Label>
                  <Flatpickr
                    options={{
                      enableTime: true,
                      noCalendar: true,
                      dateFormat: "h:i K",
                      time_24hr: false,
                    }}
                    onChange={(selectedDates) => {
                      const selectedDate = selectedDates[0];
                      const formattedTime = moment(selectedDate).format('hh:mm A');
                      setValue("time", formattedTime as unknown as string);
                    }}
                    className={`w-full px-3 py-2 border ${errors?.time ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Select Time"
                  />
                  {errors.time && <ErrorLabel msg={errors.time.message} />}
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="sheet-demo-name">Location</Label>
                  <Input
                    {...register('location', { required: 'Location is required' })}
                    placeholder="Event Location"
                    className={`${errors.location ? 'border-red-500' : ''}`}
                  />
                  {errors.location && <ErrorLabel msg={errors.location.message} />}
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="sheet-demo-name">Joinee</Label>
                  <div className="grid grid-cols-2 items-center">
                    {items.map((item) => (
                      <div className="flex items-center" key={item.id}>
                        <Checkbox
                          key={item.id}
                          className="peer" {...register('joinees')}
                          value={item.label}
                          id={item.id}
                          onCheckedChange={(checked) => {
                            return checked
                              ? setValue('joinees', [...(getValues().joinees || []), item.id])
                              : setValue('joinees', (getValues().joinees || []).filter((value) => value !== item.id));
                          }}
                        />
                        <Label notRequired htmlFor={item.id} className="peer-checked:bg-primary/10 peer-checked:border-primary peer-checked:text-primary rounded-md p-2 cursor-pointer">{item.label}</Label>
                      </div>

                    ))}
                  </div>
                </div>
                <div className="grid gap-1">
                  <Label notRequired>Image <span className="text-green-500 text-xs">(Optional)</span></Label>
                  <CldUploadButton
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                    options={{ maxFiles: 1, singleUploadAutoClose: false, sources: ["local", "google_drive"] }}
                    onSuccess={(result) => {
                      console.log("Upload Success: ", result.info);
                      if (typeof result.info === "object" && "secure_url" in result.info) {
                        setFileUrl((result.info as { secure_url: string }).secure_url || "");
                        setValue("image", (result.info as { secure_url: string }).secure_url || "");
                      } else {
                        setValue("image", "");
                      }
                    }}
                    onError={(error) => {
                      console.error("Upload Error: ", error);
                    }}
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
                            setValue("image", "");
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


              <SheetFooter>
                <Button type="submit" isLoading={isPending}>Save changes</Button>
                <SheetClose asChild>
                  <Button type="button" variant="outline" onClick={() => setShowModal(false)}>Close</Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EventCreateComponent;