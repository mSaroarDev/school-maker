import { TTeacherPayload } from "@/api/teachers/teachers.interfaces";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectComponent from "@/components/ui/select";
import { ClassesOptions, SubjectsOptions } from "@/constants/constants";
import { useState } from "react";
import { Control, FieldErrors, useFieldArray, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { GoPlus } from "react-icons/go";
import { IoArrowBack, IoArrowForwardSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

type Step5Props = {
  step: number;
  setStep: (step: number) => void;
  control: Control<TTeacherPayload>;
  errors?: FieldErrors<TTeacherPayload>;
  register: UseFormRegister<TTeacherPayload>;
  setValue: UseFormSetValue<TTeacherPayload>;
  getValues: () => TTeacherPayload;
  handleCreateTeacher: (data: TTeacherPayload) => void;
  handleSubmit: (fn: (data: TTeacherPayload) => void) => (e?: React.BaseSyntheticEvent) => void;
}

const Step5 = ({
  step,
  setStep,
  control,
  errors,
  register,
  setValue,
  getValues,
  handleCreateTeacher,
  handleSubmit
}: Step5Props) => {
  const [avatarCldImage, setAvatarCldImage] = useState<string | null>(null);

  const {append, fields, remove} = useFieldArray({
    control,
    name: "salaryHistory"
  })

  return (
    <>
      <form onSubmit={handleSubmit(handleCreateTeacher)} className="mt-5">
        <div>
          <Label>Subjects</Label>
          <SelectComponent
            name="teachingSubjects" 
            options={SubjectsOptions}
            isMulti
            control={control}
            placeholder="Select Subjects"
          />
          {errors?.teachingSubjects && <p className="text-sm text-red-500 mt-1">{errors.teachingSubjects.message}</p>}
        </div>

        <div>
          <Label>Classes</Label>
          <SelectComponent 
            name="classes" 
            options={ClassesOptions} 
            isMulti
            control={control}
            placeholder="Select Classes"
          />
          {errors?.classes && <p className="text-sm text-red-500 mt-1">{errors.classes.message}</p>}
        </div>

        <div className="flex items-center justify-between mt-5">
          <Button onClick={() => setStep(3)} variant="outline"><IoArrowBack size={18} /> Previous</Button>
          <Button type="submit">Submit <IoArrowForwardSharp size={18} /></Button>
        </div>
      </form>
    </>
  );
};

export default Step5;