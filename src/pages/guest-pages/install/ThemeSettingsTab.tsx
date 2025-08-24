import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { MdArrowBack, MdOutlineArrowForward, MdOutlineHandyman } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { FormData } from "./interfaces/formdataInterface";
import { SelectComponent } from "@/components/ui/select";
import { showConfirmModal } from "@/utils/showConfirmModal";
import { showToast } from "@/utils/showToast";

type Props = {
  currStepId: number;
  setCurrStepId: React.Dispatch<React.SetStateAction<number>>;
  formdata: FormData;
  setFormdata: React.Dispatch<React.SetStateAction<FormData>>;
};

export default function ThemeSettingsTab({
  currStepId,
  setCurrStepId,
  formdata,
  setFormdata
}: Props) {

  function handleContinue(e: React.FormEvent) {
    showConfirmModal({
      title: "Are you sure?",
      text: "You are about to complete the installation process. Do you want to proceed?",
      func: () => {
        showToast("warning", "Installation completed successfully!");
      }
    })
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
            <span>Theme Settings</span>
          </div>

          <div className="mt-5 gap-2 gap-y-4">

            <Label>Select a Theme for your website</Label>
            <div className="grid grid-cols-12 md:grid-cols-6 lg:grid-cols-3 items-center gap-3 mt-2 mb-4">
              <div className="border border-dashed border-primary p-5 rounded-md h-80"></div>
              <div className="border border-dashed border-primary p-5 rounded-md h-80"></div>
              <div className="border border-dashed border-primary p-5 rounded-md h-80"></div>
            </div>

            {/* <Label>Select Color</Label>
            <div>
              
            </div> */}
          </div>

        </div>

        <div className="flex items-center justify-between mt-10">
          <Button
            disabled={currStepId === 1}
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