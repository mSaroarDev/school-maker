import { TCreateEventPayload } from "@/api/events/events.types";
import ErrorLabel from "@/components/_core/ErrorLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/ui/richTextArea";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CldUploadButton } from "next-cloudinary";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuEye, LuPlus } from "react-icons/lu";
import { Checkbox } from "@/components/ui/checkbox"

const EventCreateComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const items = [
    {
      id: "teachers",
      label: "Teachers",
    },
    {
      id: "students",
      label: "Students",
    },
    {
      id: "staffs",
      label: "Staffs",
    },
    {
      id: "committee",
      label: "Committee",
    },
    {
      id: "parents",
      label: "parents",
    },
    {
      id: "guardians",
      label: "Guardians",
    },
  ] as const

  const defaultValues = {
    "title": "Annual Sports Day",
    "category": "Sports",
    "color": "#FF5733",
    "description": "An exciting day full of sports and activities for students.",
    "date": "2025-09-15",
    "time": "10:00 AM",
    "location": "School Playground",
    "joinees": [
      "John Doe",
      "Jane Smith",
      "Robert Brown"
    ]
  }

  const [imgUrl, setFileUrl] = useState<string>("");
  const [editorContent, setEditorContent] = useState<string>("");
  const handleEditorChange = (value: string) => {
    setEditorContent(value);
    setValue('description', JSON.stringify(value));
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues,
    mode: 'onBlur'
  });

  const onSubmit = async (data: TCreateEventPayload) => {
    console.log("Form Data: ", data);
  }

  return (
    <>
      <Sheet open={showModal} onOpenChange={setShowModal} >
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
                  <Input />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="sheet-demo-name">Time</Label>
                  <Input
                    type="time"
                    {...register('time', { required: 'Time is required' })}
                    className={`${errors.time ? 'border-red-500' : ''}`}
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
                          onChange={(e) => {
                            const target = e.target as HTMLInputElement;
                            const { checked, value } = target;
                            if (checked) {
                              setValue('joinees', [...(defaultValues.joinees || []), value]);
                            } else {
                              setValue('joinees', (defaultValues.joinees || []).filter((val) => val !== value));
                            }
                          }}
                        />
                        <Label notRequired htmlFor={item.id} className="peer-checked:bg-primary/10 peer-checked:border-primary peer-checked:text-primary rounded-md p-2 cursor-pointer">{item.label}</Label>
                      </div>

                    ))}
                  </div>
                </div>
                <div className="grid gap-1">
                  <Label notRequired>Image <span className="text-green-500 text-xs">(Optional)</span></Label>
                  <CldUploadButton>
                    <div className="w-full h-40 border-2 border-dashed border-primary/40 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer hover:bg-primary/10 transition">

                    </div>
                  </CldUploadButton>

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
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EventCreateComponent;