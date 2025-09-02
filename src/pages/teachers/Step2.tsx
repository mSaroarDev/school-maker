import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { LuSwitchCamera } from "react-icons/lu";
import avatarImage from "@/assets/images/avatar.jpeg";
import { useState } from "react";
import { IoArrowBack, IoArrowForwardSharp } from "react-icons/io5";
import { Control, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { TTeacherPayload } from "@/api/teachers/teachers.interfaces";
import { Label } from "@/components/ui/label";
import ErrorLabel from "@/components/_core/ErrorLabel";

type Step2Props = {
  step: number;
  setStep: (step: number) => void;
    control: Control<TTeacherPayload>;
    errors?: FieldErrors<TTeacherPayload>;
    register: UseFormRegister<TTeacherPayload>;
    setValue: UseFormSetValue<TTeacherPayload>
}

const Step2 = ({
  step,
  setStep,
  control,
  errors,
  register,
  setValue
}: Step2Props) => {
  const [avatarCldImage, setAvatarCldImage] = useState<string | null>(null);

  return (
    <>
      <div className="mt-5">
        <div className="mt-5 grid grid-cols-12 gap-3">
          <div className="col-span-12 lg:col-span-4">
            <Label>Phone No</Label>
            <Input 
              type="text"
              placeholder="+8801XXXXXXXXX"
              {...register("phoneNumber", { required: "Phone No is required" })}
              className={errors?.phoneNumber ? "border-red-500" : ""}
            />
            {errors?.phoneNumber && <ErrorLabel msg={errors.phoneNumber.message} />}
          </div>
          <div className="col-span-12 lg:col-span-4">
            <Label>Emergency Contact</Label>
            <Input 
              type="text"
              placeholder="+8801XXXXXXXXX"
              {...register("familyInformation.emergencyContact", { required: "Emergency Contact is required" })}
              className={errors?.familyInformation?.emergencyContact ? "border-red-500" : ""}
            />
            {errors?.familyInformation?.emergencyContact && <ErrorLabel msg={errors?.familyInformation?.emergencyContact.message} />}
          </div>
          <div className="col-span-6 lg:col-span-4">
            <Label>Email</Label>
            <Input 
              type="email"
              placeholder=""
              {...register("email", { 
                required: "Email is required", 
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address"
                }
              })}
              className={errors?.email ? "border-red-500" : ""}
            />
            {errors?.email && <ErrorLabel msg={errors.email.message as string} />}
          </div>
          <div className="col-span-12 lg:col-span-6">
            <Label>Father Name</Label>
            <Input 
              {...register("familyInformation.fatherName", { required: "Father Name is required" })}
              className={errors?.familyInformation?.fatherName ? "border-red-500" : ""}
              placeholder="Mr. John Doe"
            />
            {errors?.familyInformation?.fatherName && <ErrorLabel msg={errors?.familyInformation?.fatherName.message} />}
          </div>
          <div className="col-span-12 lg:col-span-6">
            <Label>Mother Name</Label>
            <Input 
              {...register("familyInformation.motherName", { required: "Mother Name is required" })}
              className={errors?.familyInformation?.motherName ? "border-red-500" : ""}
              placeholder="Mrs. Jane Doe"
            />
            {errors?.familyInformation?.motherName && <ErrorLabel msg={errors?.familyInformation?.motherName.message} />}
          </div>
          <div className="col-span-12">
            <Label>Current Address</Label>
            <Input 
              {...register("currentAddress", { required: "Current Address is required" })}
              className={errors?.currentAddress ? "border-red-500" : ""}
              placeholder="House #12, Road #5, Dhaka, Bangladesh"
            />
            {errors?.currentAddress && <ErrorLabel msg={errors?.currentAddress.message} />}
          </div>
          <div className="col-span-12">
            <Label>Permanant Address</Label>
            <Input 
              {...register("permanentAddress", { required: "Permanant Address is required" })}
              className={errors?.permanentAddress ? "border-red-500" : ""}
              placeholder="Village X, District Y, Bangladesh"
            />
            {errors?.permanentAddress && <ErrorLabel msg={errors?.permanentAddress.message} />}
          </div>
        </div>

        <div className="flex items-center justify-between mt-5">
          <Button onClick={() => setStep(1)} variant="outline"><IoArrowBack size={18} /> Previous</Button>
          <Button onClick={() => setStep(3)}>Next <IoArrowForwardSharp size={18} /></Button>
        </div>
      </div>
    </>
  );
};

export default Step2;