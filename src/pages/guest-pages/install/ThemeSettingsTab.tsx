"use client";
import { useUpdateInstitute } from "@/api/institute/institute.hooks";
import ErrorLabel from "@/components/_core/ErrorLabel";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { showConfirmModal } from "@/utils/showConfirmModal";
import { showToast } from "@/utils/showToast";
import { motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";
import { MdOutlineArrowForward, MdOutlineHandyman } from "react-icons/md";
import { TUpdateInstituteFormData } from "./interfaces/formdataInterface";
import { handleErrorMessage } from "@/utils/handleErrorMessage";
import { useRouter } from "next/navigation";

type Props = {
  currStepId: number;
  setCurrStepId: React.Dispatch<React.SetStateAction<number>>;
};

export default function ThemeSettingsTab({
  currStepId,
  setCurrStepId,
}: Props) {

  const { replace } = useRouter();

  function handleContinue(e: React.FormEvent) {
    showConfirmModal({
      title: "Are you sure?",
      text: "You are about to complete the installation process. Do you want to proceed?",
      func: () => {
        handleSubmit(onSubmit)(e);
      }
    })
  }

  const institute = localStorage.getItem("instituteCreated");
  const instituteId = institute ? JSON.parse(institute)?._id : null;

  const { mutateAsync: updateInstitute, isPending: isUpdating } = useUpdateInstitute();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      frontendTheme: "68a7ffc9ad0b2c6fc5074da3",
    }
  });

  const onSubmit = async (data: TUpdateInstituteFormData) => {
    if (!data.frontendTheme) {
      showToast("error", "Please select a theme");
      return;
    }

    try {
      const res = await updateInstitute({
        ...data,
        instituteId: instituteId || "",
      });

      if (res?.success) {
        showToast("success", "Institute Created successfully");
        replace("/login");
        localStorage.removeItem("instituteCreated");
      }
    } catch (error) {
      showToast("error", handleErrorMessage(error));
    }
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-3 mt-2 mb-4">
              <div
                onClick={() => {
                  setValue("frontendTheme", "68a7ffc9ad0b2c6fc5074da3");
                }}
                className="border border-dashed border-primary p-5 rounded-md h-80">

              </div>
              {errors.frontendTheme && <ErrorLabel msg={errors.frontendTheme.message || "Please select a theme"} />}
            </div>
          </div>

        </div>

        <div className="flex items-center justify-end">
          <Button
            disabled={isUpdating}
            onClick={handleContinue}
            className="bg-primary/90 hover:bg-primary text-white"
            isLoading={isUpdating}
          >Next <MdOutlineArrowForward /></Button>
        </div>
      </motion.div>
    </div>
  );
}