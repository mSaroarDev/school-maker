import { TStudentsCreatePayload } from "@/api/students/teachers.interfaces";
import ErrorLabel from "@/components/_core/ErrorLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectComponent from "@/components/ui/select";
import { bloodGroupsOption, gendersOption, religionsOption } from "@/constants/constants";
import { Control, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { IoArrowForwardSharp } from "react-icons/io5";
import { MdOutlineEditNote } from "react-icons/md";
import "flatpickr/dist/themes/light.css";
import Flatpickr from "react-flatpickr";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import { useState } from "react";
import avatarImage from "@/assets/images/avatar.jpeg";
import { LuSwitchCamera } from "react-icons/lu";

type Step1Props = {
  setStep: (step: number) => void;
  control: Control<TStudentsCreatePayload>;
  errors?: FieldErrors<TStudentsCreatePayload>;
  register: UseFormRegister<TStudentsCreatePayload>;
  setValue: UseFormSetValue<TStudentsCreatePayload>;
  getValues: () => TStudentsCreatePayload;
}

const Step1 = ({
  setStep,
  control,
  errors,
  register,
  setValue,
  getValues
}: Step1Props) => {
  const [avatarCldImage, setAvatarCldImage] = useState<string | null>(null);
  
  return (
    <>
      <h3 className="font-medium text-lg flex items-center gap-2">
        <MdOutlineEditNote size={25} />
        Basic Details
      </h3>

      <div className="my-5 grid grid-cols-12 gap-3">
        <div className="col-span-12 w-24 h-24 relative rounded-full overflow-hidden ring ring-primary/40">
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
              <LuSwitchCamera size={22} className="cursor-pointer" />
            </CldUploadButton>
          </div>
        </div>


        <div className="col-span-12 md:col-span-6">
          <Label>Full Name</Label>
          <Input
            {...register("fullName", { required: "Full Name is required" })}
            placeholder="John Doe"
            className={errors?.fullName ? "border-red-500" : ""}
          />
          {errors?.fullName && <ErrorLabel msg={errors.fullName?.message as string} />}
        </div>
        <div className="col-span-6 md:col-span-3">
          <Label>Student ID</Label>
          <Input
            {...register("studentId", { required: "Student ID is required" })}
            placeholder="STU12345"
            className={errors?.studentId ? "border-red-500" : ""}
          />
          {errors?.studentId && <ErrorLabel msg={errors.studentId?.message as string} />}
        </div>
        <div className="col-span-6 md:col-span-3">
          <Label>Session</Label>
          <Input
            {...register("session", { required: "Session is required" })}
            placeholder="2022-2023"
            className={errors?.session ? "border-red-500" : ""}
          />
          {errors?.session && <ErrorLabel msg={errors.session?.message as string} />}
        </div>
        <div className="col-span-6 md:col-span-3">
          <Label>Current Class</Label>
          <Input
            {...register("class", { required: "Class is required" })}
            placeholder="8"
            className={errors?.class ? "border-red-500" : ""}
          />
          {errors?.class && <ErrorLabel msg={errors.class?.message as string} />}
        </div>
        <div className="col-span-6 md:col-span-3">
          <Label>Section</Label>
          <Input
            {...register("section", { required: "Section is required" })}
            placeholder="A"
            className={errors?.section ? "border-red-500" : ""}
          />
          {errors?.section && <ErrorLabel msg={errors.section?.message as string} />}
        </div>
        <div className="col-span-6 md:col-span-3">
          <Label>Roll No</Label>
          <Input
            {...register("rollNo", { required: "Roll No is required", valueAsNumber: true })}
            type="number"
            placeholder="12"
            className={errors?.rollNo ? "border-red-500" : ""}
          />
          {errors?.rollNo && <ErrorLabel msg={errors.rollNo?.message as string} />}
        </div>
        <div className="col-span-6 md:col-span-3">
          <Label>Registration No</Label>
          <Input
            {...register("registrationNo", { required: "Registration No is required", valueAsNumber: true })}
            type="number"
            placeholder="123456"
            className={errors?.registrationNo ? "border-red-500" : ""}
          />
          {errors?.registrationNo && <ErrorLabel msg={errors.registrationNo?.message as string} />}
        </div>
        <div className="col-span-12 md:col-span-6">
          <Label>Father Name</Label>
          <Input
            {...register("basicInformation.fatherName", { required: "Father Name is required" })}
            placeholder="Mr. Doe"
            className={errors?.basicInformation?.fatherName ? "border-red-500" : ""}
          />
          {errors?.basicInformation?.fatherName && <ErrorLabel msg={errors.basicInformation.fatherName?.message as string} />}
        </div>
        <div className="col-span-12 md:col-span-6">
          <Label>Mother Name</Label>
          <Input
            {...register("basicInformation.motherName", { required: "Mother Name is required" })}
            placeholder="Mrs. Doe"
            className={errors?.basicInformation?.motherName ? "border-red-500" : ""}
          />
          {errors?.basicInformation?.motherName && <ErrorLabel msg={errors.basicInformation.motherName?.message as string} />}
        </div>
        <div className="col-span-6 md:col-span-3">
          <Label>Gender</Label>
          <SelectComponent
            control={control}
            name="basicInformation.gender"
            errors={errors}
            options={gendersOption}
          />
        </div>
        <div className="col-span-6 md:col-span-3">
          <Label>Date of Birth</Label>
          <Flatpickr
            onChange={(dateSelected: Date[]) => {
              setValue("basicInformation.dateOfBirth", dateSelected[0]?.toISOString() || "");
            }}
            className={`w-full px-3 py-2 border rounded-sm ${errors?.basicInformation?.dateOfBirth ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none`}
            placeholder="Select Date"
            options={{
              dateFormat: "Y-m-d",
              maxDate: new Date(),
              enableTime: false,
              mode: "single"
            }}
            value={getValues().basicInformation?.dateOfBirth || ""}
          />
          {errors?.basicInformation?.dateOfBirth && <ErrorLabel msg={errors.basicInformation.dateOfBirth?.message as string} />}
        </div>
        <div className="col-span-6 md:col-span-3">
          <Label>Religion</Label>
          <SelectComponent
            control={control}
            name="basicInformation.religion"
            errors={errors}
            options={religionsOption}
          />
          {errors?.basicInformation?.religion && <ErrorLabel msg={errors.basicInformation.religion?.message as string} />}
        </div>
        <div className="col-span-6 md:col-span-3">
          <Label>Blood Group</Label>
          <SelectComponent
            control={control}
            name="basicInformation.bloodGroup"
            errors={errors}
            options={bloodGroupsOption}
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <Label>Birth Registration No</Label>
          <Input
            {...register("basicInformation.nidNumber")}
            placeholder="Birth Registration No"
            className={errors?.basicInformation?.nidNumber ? "border-red-500" : ""}
          />
          {errors?.basicInformation?.nidNumber && <ErrorLabel msg={errors.basicInformation.nidNumber?.message as string} />}
        </div>
      </div>

      <div className="flex items-center justify-end mt-5">
        {/* <Button variant="outline"><IoArrowBack size={18} /> Previous</Button> */}
        <Button onClick={() => setStep(2)}>Next <IoArrowForwardSharp size={18} /></Button>
      </div>
    </>
  );
};

export default Step1;