import { TStudentsCreatePayload } from "@/api/students/students.interfaces";
import ErrorLabel from "@/components/_core/ErrorLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "flatpickr/dist/themes/light.css";
import { Control, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { IoArrowBack, IoArrowForwardSharp } from "react-icons/io5";
import { MdOutlineEditNote } from "react-icons/md";

type Step2Props = {
  setStep: (step: number) => void;
  control: Control<TStudentsCreatePayload>;
  errors?: FieldErrors<TStudentsCreatePayload>;
  register: UseFormRegister<TStudentsCreatePayload>;
  setValue: UseFormSetValue<TStudentsCreatePayload>;
  getValues: () => TStudentsCreatePayload;
}

const Step2 = ({
  setStep,
  errors,
  register,
}: Step2Props) => {
  return (
    <>
      <h3 className="font-medium text-lg flex items-center gap-2">
        <MdOutlineEditNote size={25} />
        Current Address
      </h3>

      <div className="mt-2 mb-5 grid grid-cols-12 gap-3">
        <div className="col-span-12 md:col-span-4">
          <Label>Division</Label>
          <Input
            {...register("contactInformation.presentAddress.division", { required: "Division is required" })}
            placeholder="Division"
            className={errors?.contactInformation?.presentAddress?.division ? "border-red-500" : ""}
          />
          {errors?.contactInformation?.presentAddress?.division && <ErrorLabel msg={errors.contactInformation?.presentAddress?.division?.message as string} />}
        </div>

        <div className="col-span-12 md:col-span-4">
          <Label>District</Label>
          <Input
            {...register("contactInformation.presentAddress.district", { required: "District is required" })}
            placeholder="District"
            className={errors?.contactInformation?.presentAddress?.district ? "border-red-500" : ""}
          />
          {errors?.contactInformation?.presentAddress?.district && <ErrorLabel msg={errors.contactInformation?.presentAddress?.district?.message as string} />}
        </div>

        <div className="col-span-12 md:col-span-4">
          <Label>Upazila</Label>
          <Input
            {...register("contactInformation.presentAddress.upazila", { required: "Upazila is required" })}
            placeholder="Upazila"
            className={errors?.contactInformation?.presentAddress?.upazila ? "border-red-500" : ""}
          />
          {errors?.contactInformation?.presentAddress?.upazila && <ErrorLabel msg={errors.contactInformation?.presentAddress?.upazila?.message as string} />}
        </div>

        <div className="col-span-12 md:col-span-4">
          <Label>Postal Code</Label>
          <Input
            {...register("contactInformation.presentAddress.postalCode", { required: "Postal Code is required" })}
            placeholder="Postal Code"
            className={errors?.contactInformation?.presentAddress?.upazila ? "border-red-500" : ""}
          />
          {errors?.contactInformation?.presentAddress?.postalCode && <ErrorLabel msg={errors.contactInformation?.presentAddress?.postalCode?.message as string} />}
        </div>

        <div className="col-span-12 md:col-span-8">
          <Label>Road Name/Street Name</Label>
          <Input
            {...register("contactInformation.presentAddress.address", { required: "Postal Code is required" })}
            placeholder="123/A, ABC Road"
            className={errors?.contactInformation?.presentAddress?.address ? "border-red-500" : ""}
          />
          {errors?.contactInformation?.presentAddress?.address && <ErrorLabel msg={errors.contactInformation?.presentAddress?.address?.message as string} />}
        </div>

      </div>

      <h3 className="font-medium text-lg flex items-center gap-2 mt-5">
        <MdOutlineEditNote size={25} />
        Permanant Address
      </h3>

      <div className="mt-2 grid grid-cols-12 gap-3">
        <div className="col-span-12 md:col-span-4">
          <Label>Division</Label>
          <Input
            {...register("contactInformation.permanentAddress.division", { required: "Division is required" })}
            placeholder="Division"
            className={errors?.contactInformation?.permanentAddress?.division ? "border-red-500" : ""}
          />
          {errors?.contactInformation?.permanentAddress?.division && <ErrorLabel msg={errors.contactInformation?.permanentAddress?.division?.message as string} />}
        </div>

        <div className="col-span-12 md:col-span-4">
          <Label>District</Label>
          <Input
            {...register("contactInformation.permanentAddress.district", { required: "District is required" })}
            placeholder="District"
            className={errors?.contactInformation?.permanentAddress?.district ? "border-red-500" : ""}
          />
          {errors?.contactInformation?.permanentAddress?.district && <ErrorLabel msg={errors.contactInformation?.permanentAddress?.district?.message as string} />}
        </div>

        <div className="col-span-12 md:col-span-4">
          <Label>Upazila</Label>
          <Input
            {...register("contactInformation.permanentAddress.upazila", { required: "Upazila is required" })}
            placeholder="Upazila"
            className={errors?.contactInformation?.permanentAddress?.upazila ? "border-red-500" : ""}
          />
          {errors?.contactInformation?.permanentAddress?.upazila && <ErrorLabel msg={errors.contactInformation?.permanentAddress?.upazila?.message as string} />}
        </div>

        <div className="col-span-12 md:col-span-4">
          <Label>Postal Code</Label>
          <Input
            {...register("contactInformation.permanentAddress.postalCode", { required: "Postal Code is required" })}
            placeholder="Postal Code"
            className={errors?.contactInformation?.permanentAddress?.upazila ? "border-red-500" : ""}
          />
          {errors?.contactInformation?.permanentAddress?.postalCode && <ErrorLabel msg={errors.contactInformation?.permanentAddress?.postalCode?.message as string} />}
        </div>

        <div className="col-span-12 md:col-span-8">
          <Label>Road Name/Street Name</Label>
          <Input
            {...register("contactInformation.permanentAddress.address", { required: "Postal Code is required" })}
            placeholder="123/A, ABC Road"
            className={errors?.contactInformation?.permanentAddress?.address ? "border-red-500" : ""}
          />
          {errors?.contactInformation?.permanentAddress?.address && <ErrorLabel msg={errors.contactInformation?.permanentAddress?.address?.message as string} />}
        </div>
      </div>

      <div className="flex items-center justify-between mt-5">
        <Button onClick={() => setStep(1)} variant="outline"><IoArrowBack size={18} /> Previous</Button>
        <Button onClick={() => setStep(3)}>Next <IoArrowForwardSharp size={18} /></Button>
      </div>
    </>
  );
};

export default Step2;