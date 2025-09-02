import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { LuSwitchCamera } from "react-icons/lu";
import avatarImage from "@/assets/images/avatar.jpeg";
import { useState } from "react";
import { IoArrowBack, IoArrowForwardSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { GoPlus } from "react-icons/go";
import { Control, FieldErrors, useFieldArray, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { TTeacherPayload } from "@/api/teachers/teachers.interfaces";

type Step4Props = {
  step: number;
  setStep: (step: number) => void;
  control: Control<TTeacherPayload>;
  errors?: FieldErrors<TTeacherPayload>;
  register: UseFormRegister<TTeacherPayload>;
  setValue: UseFormSetValue<TTeacherPayload>;
  getValues: () => TTeacherPayload;
}

const Step4 = ({
  step,
  setStep,
  control,
  errors,
  register,
  setValue,
  getValues
}: Step4Props) => {
  const [avatarCldImage, setAvatarCldImage] = useState<string | null>(null);

  const {append, fields, remove} = useFieldArray({
    control,
    name: "salaryHistory"
  })

  return (
    <>
      <div className="mt-5">
        <table width={"100%"}>
          <thead>
            <tr>
              <th className="text-left p-2 border">Salary Type</th>
              <th className="text-center p-2 border">Effected Date</th>
              <th className="text-center p-2 border">Amount</th>
              <th className="text-center p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border"><Input /></td>
              <td className="border"><Input /></td>
              <td className="border"><Input /></td>
              <td className="border text-center">
                <RxCross2 size={20} className="mx-auto text-red-500 cursor-pointer" />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex items-center justify-end">
          <Button 
            onClick={()=> {
              append({
                salaryType: "",
                amount: "",
                effectedFrom: ""
              })
            }}
            variant="outline" className="mt-3"><GoPlus size={18} /> Add More</Button>
        </div>

        <div className="flex items-center justify-between mt-5">
          <Button onClick={() => setStep(3)} variant="outline"><IoArrowBack size={18} /> Previous</Button>
          <Button onClick={() => setStep(4)}>Next <IoArrowForwardSharp size={18} /></Button>
        </div>
      </div>
    </>
  );
};

export default Step4;