import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectComponent } from "@/components/ui/select";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdArrowBack, MdOutlineArrowForward, MdOutlineHandyman } from "react-icons/md";
import { TInstallInstituteFormData } from "./interfaces/formdataInterface";
import { institutesTypesOption } from "@/constants/constants";

type Props = {
  currStepId: number;
  setCurrStepId: React.Dispatch<React.SetStateAction<number>>;
};

export default function InstituteInfoTab({
  currStepId,
  setCurrStepId,
}: Props) {

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    // if (!agreed) {
    //   return;
    // }

    setCurrStepId(currStepId + 1);
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TInstallInstituteFormData>({
    defaultValues: {
      instituteType: "",
    }
  });

  const onSubmit: SubmitHandler<TInstallInstituteFormData> = (data) => console.log(data);

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
            <span>Enter your Institute Informations</span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 gap-2 gap-y-4 grid md:grid-cols-12">
            <div className="md:col-span-8">
              <Label className="mb-2">Institute Name</Label>
              <Input
                type="text"
                placeholder="eg: ABC High School"
                {...register("name", { required: true })}
                className={`${errors.name ? "border-red-500" : ""}`}
              />
              {errors.name && <span className="text-sm text-red-500">School Name is required</span>}
            </div>
            <div className="md:col-span-4">
              <Label className="mb-2">Institue Type</Label>
              <SelectComponent
                options={institutesTypesOption}
                value={watch("instituteType") ? { value: watch("instituteType"), label: watch("instituteType") } : null}
                onChange={(selected) => {
                  if (!selected) {
                    setValue("instituteType", "");
                    return;
                  }
                  setValue("instituteType", selected as string);
                }}
                isClearable
              />
            </div>
            <div className="md:col-span-4">
              <Label className="mb-2">Stablished Year</Label>
              <Input
                type="number"
                placeholder="eg: 1990"
                {...register("stablishedYear", { required: true, min: 1900, max: new Date().getFullYear() })}
                className={`${errors.stablishedYear ? "border-red-500" : ""}`}
              />
            </div>
            <div className="md:col-span-4">
              <Label className="mb-2">EIIN</Label>
              <Input
                type="number"
                placeholder="eg: 123456"
                {...register("eiin", { required: true, min: 100000, max: 999999 })}
                className={`${errors.eiin ? "border-red-500" : ""}`}
              />
              {errors.eiin && <span className="text-sm text-red-500">EIIN is required</span>}
            </div>
            <div className="md:col-span-4">
              <Label className="mb-2">MPO Type</Label>
              <SelectComponent />
            </div>
            <div className="md:col-span-6">
              <Label className="mb-2">Education Level</Label>
              <SelectComponent />
            </div>
            <div className="md:col-span-6">
              <Label className="mb-2">Shift</Label>
              <SelectComponent />
            </div>
          </form>

        </div>

        <div className="flex items-center justify-between mt-10">
          <Button
            disabled={currStepId === 1}
            onClick={() => setCurrStepId(currStepId - 1)}
          ><MdArrowBack size={18} />Previous</Button>
          <Button
            type="submit"
            disabled={false}
            onClick={handleContinue}
            className="bg-primary/90 hover:bg-primary text-white"
          >Next <MdOutlineArrowForward /></Button>
        </div>
      </motion.div>
    </div>
  );
}