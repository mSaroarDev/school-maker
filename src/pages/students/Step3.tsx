import { TStudentsCreatePayload } from "@/api/students/teachers.interfaces";
import ErrorLabel from "@/components/_core/ErrorLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "flatpickr/dist/themes/light.css";
import { Control, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { IoArrowBack, IoArrowForwardSharp } from "react-icons/io5";
import { MdOutlineEditNote } from "react-icons/md";

type Step3Props = {
  setStep: (step: number) => void;
  control: Control<TStudentsCreatePayload>;
  errors?: FieldErrors<TStudentsCreatePayload>;
  register: UseFormRegister<TStudentsCreatePayload>;
  setValue: UseFormSetValue<TStudentsCreatePayload>;
  getValues: () => TStudentsCreatePayload;
}

const Step3 = ({
  setStep,
  control,
  errors,
  register,
  setValue,
  getValues
}: Step3Props) => {
  return (
    <>
      <h3 className="font-medium text-lg flex items-center gap-2">
        <MdOutlineEditNote size={25} />
        Gurdian Informations
      </h3>

      <div className="mt-2 mb-5 grid grid-cols-12 gap-3">
        <div className="col-span-12 md:col-span-8">
          <Label>Gurdian Name</Label>
          <Input
            {...register("gurdianInformation.name", { required: "Gurdian Name is required" })}
            placeholder="Gurdian Name"
            className={errors?.gurdianInformation?.name ? "border-red-500" : ""}
          />
          {errors?.gurdianInformation?.name && <ErrorLabel msg={errors.gurdianInformation?.name?.message as string} />}
        </div>

        <div className="col-span-12 md:col-span-4">
          <Label>Relation</Label>
          <Input
            {...register("gurdianInformation.relation", { required: "Relation is required" })}
            placeholder="Father/Mother/Uncle etc"
            className={errors?.gurdianInformation?.relation ? "border-red-500" : ""}
          />
          {errors?.gurdianInformation?.relation && <ErrorLabel msg={errors.gurdianInformation?.relation?.message as string} />}
        </div>

        <div className="col-span-12 md:col-span-4">
          <Label>Gurdian Phone Number</Label>
          <Input
            {...register("gurdianInformation.phoneNumber", { required: "Phone Number is required" })}
            placeholder="+8801XXXXXXXXX"
            className={errors?.gurdianInformation?.phoneNumber ? "border-red-500" : ""}
          />
          {errors?.gurdianInformation?.phoneNumber && <ErrorLabel msg={errors.gurdianInformation?.phoneNumber?.message as string} />}
        </div>

        <div className="col-span-12 md:col-span-4">
          <Label>Gurdian Email</Label>
          <Input
            {...register("gurdianInformation.email", { required: "Email is required" })}
            placeholder="Email"
            className={errors?.gurdianInformation?.email ? "border-red-500" : ""}
          />
          {errors?.gurdianInformation?.email && <ErrorLabel msg={errors.gurdianInformation?.email?.message as string} />}
        </div>

        <div className="col-span-12 md:col-span-4">
          <Label>Gurdian Occupation</Label>
          <Input
            {...register("gurdianInformation.occupation", { required: "Occupation is required" })}
            placeholder="Occupation"
            className={errors?.gurdianInformation?.occupation ? "border-red-500" : ""}
          />
          {errors?.gurdianInformation?.occupation && <ErrorLabel msg={errors.gurdianInformation?.occupation?.message as string} />}
        </div>
      </div>

      <div className="flex items-center justify-between mt-5">
        <Button onClick={() => setStep(2)} variant="outline"><IoArrowBack size={18} /> Previous</Button>
        <Button onClick={() => setStep(4)}>Next <IoArrowForwardSharp size={18} /></Button>
      </div>
    </>
  );
};

export default Step3;