import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { MdArrowBack, MdOutlineArrowForward, MdOutlineHandyman } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { FormData } from "./interfaces/formdataInterface";
import { SelectComponent } from "@/components/ui/select";

type Props = {
  currStepId: number;
  setCurrStepId: React.Dispatch<React.SetStateAction<number>>;
  formdata: FormData;
  setFormdata: React.Dispatch<React.SetStateAction<FormData>>;
};

export default function AdminInfoTab({
  currStepId,
  setCurrStepId,
  formdata,
  setFormdata
}: Props) {

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    // if (!agreed) {
    //   return;
    // }

    setCurrStepId(currStepId + 1);
  }

  return (
    <div className="">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full"
      >
        <div className="backdrop-blur mt-5">
          <div className="mb-5 flex items-start gap-4 text-base font-semibold text-slate-900 dark:text-slate-200">
            <MdOutlineHandyman size={22} />
            <span>Create the first login credentials</span>
          </div>

          <div className="mt-5 gap-2 gap-y-4 grid md:grid-cols-12">
            <div className="md:col-span-12">
              <Label className="mb-2">Full Name</Label>
              <Input type="email" placeholder="Email" />
            </div>
            <div className="md:col-span-6">
              <Label className="mb-2">Email</Label>
              <Input type="email" placeholder="Email" />
            </div>
            <div className="md:col-span-6">
              <Label className="mb-2">Phone</Label>
              <Input type="email" placeholder="eg: 1990" />
            </div>
            <div className="md:col-span-6">
              <Label className="mb-2">Password</Label>
              <Input type="email" placeholder="Email" />
            </div>
            <div className="md:col-span-6">
              <Label className="mb-2">Retype Password</Label>
              <Input type="email" placeholder="Email" />
            </div>
          </div>

        </div>

        <div className="flex items-center justify-between mt-10">
          <Button
           
          ><MdArrowBack size={18} />Previous</Button>
          <Button
            disabled={false}
            onClick={handleContinue}
            className="bg-primary/90 hover:bg-primary text-white"
          >Next <MdOutlineArrowForward /></Button>
        </div>
      </motion.div>
    </div>
  );
}