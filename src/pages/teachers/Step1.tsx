import { TTeacherPayload } from "@/api/teachers/teachers.interfaces";
import avatarImage from "@/assets/images/avatar.jpeg";
import ErrorLabel from "@/components/_core/ErrorLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectComponent from "@/components/ui/select";
import { bloodGroupsOption, gendersOption } from "@/constants/constants";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { Control, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { IoArrowForwardSharp } from "react-icons/io5";
import { LuSwitchCamera } from "react-icons/lu";

type Step1Props = {
  step: number;
  setStep: (step: number) => void;
  control: Control<TTeacherPayload>;
  errors?: FieldErrors<TTeacherPayload>;
  register: UseFormRegister<TTeacherPayload>;
  setValue: UseFormSetValue<TTeacherPayload>
}

const Step1 = ({
  step,
  setStep,
  control,
  errors,
  register,
  setValue
}: Step1Props) => {
  const [avatarCldImage, setAvatarCldImage] = useState<string | null>(null);

  return (
    <>
      <div className="mt-5">
        <div className="w-24 h-24 relative rounded-full overflow-hidden ring ring-primary/40">
          <Image
            src={avatarCldImage || avatarImage}
            alt="Avatar"
            fill
            className="object-cover"
          />

          <div className="absolute bg-black/30 hover:bg-primary/30 top-0 bottom-0 left-0 right-0 flex items-center justify-center cursor-pointer transition-all duration-150">
            <CldUploadButton
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              options={{ maxFiles: 1, singleUploadAutoClose: false, sources: ["local", "google_drive"] }}
              onSuccess={(result) => {
                console.log("Upload Success: ", result.info);
                if (typeof result.info === "object" && "secure_url" in result.info) {
                  setAvatarCldImage((result.info as { secure_url: string }).secure_url || "");
                  setValue("avatar", (result.info as { secure_url: string }).secure_url || "");
                } else {
                  setValue("avatar", "");
                }
              }}
              onError={(error) => {
                console.error("Upload Error: ", error);
              }}
            >
              <LuSwitchCamera size={22} />
            </CldUploadButton>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-12 gap-3">
          <div className="col-span-12 lg:col-span-6">
            <Label>Full Name</Label>
            <Input
              placeholder="John Doe"
              {...register("fullName", { required: "Full Name is required" })}
              className={errors?.fullName ? "border-red-500" : ""}
            />
            {errors?.fullName && <ErrorLabel msg={errors.fullName?.message as string} />}
          </div>
          <div className="col-span-6 lg:col-span-3">
            <Label>Designation</Label>
            <Input
              placeholder="Senior Teacher"
              {...register("designation", { required: "Designation is required" })}
              className={errors?.designation ? "border-red-500" : ""}
            />
            {errors?.designation && <ErrorLabel msg={errors.designation?.message as string} />}
          </div>
          <div className="col-span-6 lg:col-span-3">
            <Label>Employee Id</Label>
            <Input
              placeholder="EMP-001"
              {...register("employeeId", { required: "Employee ID is required" })}
              className={errors?.employeeId ? "border-red-500" : ""}
            />
            {errors?.employeeId && <ErrorLabel msg={errors.employeeId?.message as string} />}
          </div>
          <div className="col-span-6 lg:col-span-4">
            <Label>Joining Date</Label>
            <Input
              type="date"
              {...register("joiningDate", { required: "Joining Date is required" })}
              className={errors?.joiningDate ? "border-red-500" : ""}
            />
            {errors?.joiningDate && <ErrorLabel msg={errors.joiningDate?.message as string} />}
          </div>
          <div className="col-span-6 lg:col-span-4">
            <Label>Gender</Label>
            <SelectComponent
              name="gender"
              errors={errors}
              control={control}
              options={gendersOption}
              rules={{ required: "Gender is required", deps: ["gender"] }}
            />
          </div>
          <div className="col-span-6 lg:col-span-4">
            <Label>Blood Group</Label>
            <SelectComponent
              name="bloodGroup"
              errors={errors}
              control={control}
              options={bloodGroupsOption}
              rules={{ required: "Blood Group is required", deps: ["bloodGroup"] }}
            />
          </div>
          <div className="col-span-6 lg:col-span-4">
            <Label>Date of Birth</Label>
            <Input 
              type="date"
              {...register("dateOfBirth", { required: "Date of Birth is required" })}
              className={errors?.dateOfBirth ? "border-red-500" : ""}
            />
            {errors?.dateOfBirth && <ErrorLabel msg={errors.dateOfBirth?.message as string} />}
          </div>
          <div className="col-span-6 lg:col-span-4">
            <Label>NID Number</Label>
            <Input 
              placeholder="NID Number"
              {...register("nidNumber", { required: "NID Number is required" })}
              className={errors?.nidNumber ? "border-red-500" : ""}
            />
            {errors?.nidNumber && <ErrorLabel msg={errors.nidNumber?.message as string} />}
          </div>
        </div>

        <div className="flex items-center justify-end mt-5">
          {/* <Button variant="outline"><IoArrowBack size={18} /> Previous</Button> */}
          <Button onClick={() => setStep(2)}>Next <IoArrowForwardSharp size={18} /></Button>
        </div>
      </div>
    </>
  );
};

export default Step1;