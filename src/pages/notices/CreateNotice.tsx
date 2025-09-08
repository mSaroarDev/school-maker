"use client";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import NoticeForm from "./NoticeForm";

const CreateNotice = () => {

  const [showModal, setShowModal] = useState<boolean>(false);


  return (
    <>
      <Sheet open={showModal} onOpenChange={setShowModal} >
        <SheetTrigger asChild>
          <button onClick={() => setShowModal(true)} className="header-buttons"><LuPlus size={18} /></button>
        </SheetTrigger>
        <SheetContent>
          <NoticeForm />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreateNotice;