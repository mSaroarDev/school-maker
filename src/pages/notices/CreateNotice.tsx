"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/ui/richTextArea";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuPlus } from "react-icons/lu";

const CreateNotice = () => {
  
  const [showModal, setShowModal] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  const defaultValues = {
    title: '',
    description: JSON.stringify(text),
    filUrl: ''
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues
  });


  return (
    <>
      <Sheet open={showModal} onOpenChange={setShowModal}>
        <SheetTrigger asChild>
          <button onClick={() => setShowModal(true)} className="header-buttons"><LuPlus size={18} /></button>
        </SheetTrigger>
        <SheetContent>
          <form className="h-full flex flex-col">
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
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="sheet-demo-username">Description</Label>
                <RichTextEditor 
                  value={text} 
                  onChange={setText} 
                  placeholder="Write something..."
                />
              </div>
            </div>
            <SheetFooter>
              <Button type="submit">Save changes</Button>
              <SheetClose asChild>
                <Button type="button" variant="outline">Close</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreateNotice;