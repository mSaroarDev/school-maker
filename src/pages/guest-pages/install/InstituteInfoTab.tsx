import { useCreateInstitute } from "@/api/institute/institute.hooks";
import ErrorLabel from "@/components/_core/ErrorLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectComponent from "@/components/ui/select";
import { educationLevelsOption, institutesTypesOption, mpoTypesOption, shiftsOption } from "@/constants/constants";
import { showToast } from "@/utils/showToast";
import { motion } from "framer-motion";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdArrowBack, MdOutlineArrowForward, MdOutlineHandyman } from "react-icons/md";
import { TInstallInstituteFormData } from "./interfaces/formdataInterface";

type Props = {
  currStepId: number;
  setCurrStepId: React.Dispatch<React.SetStateAction<number>>;
};

export default function InstituteInfoTab({
  currStepId,
  setCurrStepId,
}: Props) {

  const { mutateAsync: createInstitute, isPending: isCreatingInstitute } = useCreateInstitute();
  const defaultValues = {
    name: "",
    stablishedYear: null as number | null,
    eiin: "",
    mpoType: "",
    instituteType: [],
    educationLevel: [],
    shift: [],
    instituteContacts: {
      contactNo: ""
    }
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TInstallInstituteFormData>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<TInstallInstituteFormData> = async (data) => {
    try {
      const res = await createInstitute(data);
      if (res?.success) {
        setCurrStepId(currStepId + 1);
      }
    } catch (error) {
      showToast("error", (error as Error).message || "Failed to create institute");
    }
  };

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
              {errors.name && <ErrorLabel msg="School Name is required" />}
            </div>
            <div className="md:col-span-4">
              <Label className="mb-2">Institue Type</Label>
              <SelectComponent<TInstallInstituteFormData, "instituteType">
                name="instituteType"
                isMulti
                control={control}
                errors={errors}
                options={institutesTypesOption}
                rules={{ required: "Choose a institute Type", deps: ["instituteType"] }}
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
              {errors.stablishedYear && <ErrorLabel msg={
                errors.stablishedYear?.type === "min" || errors.stablishedYear?.type === "max"
                  ? `Year must be between 1900 and ${new Date().getFullYear()}`
                  : "Stablished Year is required"
              } />}
            </div>
            <div className="md:col-span-4">
              <Label className="mb-2" notRequired>EIIN</Label>
              <Input
                type="number"
                placeholder="eg: 123456"
                {...register("eiin", { required: false, min: 100000, max: 999999 })}
                className={`${errors.eiin ? "border-red-500" : ""}`}
              />
              {errors.eiin && <ErrorLabel msg={
                errors.eiin?.type === "min" || errors.eiin?.type === "max"
                  ? "EIIN must be 6 digit"
                  : "EIIN is required"
              } />}
            </div>
            <div className="md:col-span-4">
              <Label className="mb-2">MPO Type</Label>
              <SelectComponent
                name="mpoType"
                control={control}
                errors={errors}
                options={mpoTypesOption}
                rules={{ required: "Choose a MPO Type", deps: ["mpoType"] }}
              />
            </div>
            <div className="md:col-span-6">
              <Label className="mb-2">Education Level</Label>
              <SelectComponent
                name="educationLevel"
                control={control}
                errors={errors}
                isMulti
                options={educationLevelsOption}
                rules={{ required: "Choose at least one education level", deps: ["educationLevel"] }}
              />
            </div>
            <div className="md:col-span-6">
              <Label className="mb-2">Shift</Label>
              <SelectComponent
                name="shift"
                control={control}
                errors={errors}
                isMulti
                options={shiftsOption}
                rules={{ required: "Choose at least one shift", deps: ["shift"] }}
              />
            </div>

            <div className="md:col-span-4">
              <Label className="mb-2">Contact No</Label>
              <Input
                type="text"
                placeholder="eg: +8801XXXXXXXXX"
                {...register("instituteContacts.contactNo", { required: true })}
                className={`${errors.instituteContacts?.contactNo ? "border-red-500" : ""}`}
              />
              {errors.instituteContacts?.contactNo
                && <ErrorLabel msg="School Name is required" />}
            </div>

            <div className="col-span-12 flex items-center justify-between mt-10">
              <Button
                type="button"
                disabled={currStepId === 1 || isCreatingInstitute}
                onClick={() => setCurrStepId(currStepId - 1)}
              ><MdArrowBack size={18} />Previous</Button>
              <Button
                type="submit"
                disabled={isCreatingInstitute}
                isLoading={isCreatingInstitute}
                className="bg-primary/90 hover:bg-primary text-white"
              >
                Next
                <MdOutlineArrowForward />
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}