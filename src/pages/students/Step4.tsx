import { TStudentsCreatePayload } from "@/api/students/students.interfaces";
import ErrorLabel from "@/components/_core/ErrorLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectComponent from "@/components/ui/select";
import { resultOptions } from "@/constants/constants";
import "flatpickr/dist/themes/light.css";
import { Control, FieldErrors, useFieldArray, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { BiPlus } from "react-icons/bi";
import { HiTrash } from "react-icons/hi";
import { IoArrowBack, IoArrowForwardSharp } from "react-icons/io5";
import { MdOutlineEditNote } from "react-icons/md";
import { RxCross1, RxCross2 } from "react-icons/rx";

type Step4Props = {
  setStep: (step: number) => void;
  control: Control<TStudentsCreatePayload>;
  errors?: FieldErrors<TStudentsCreatePayload>;
  register: UseFormRegister<TStudentsCreatePayload>;
  setValue: UseFormSetValue<TStudentsCreatePayload>;
  getValues: () => TStudentsCreatePayload;
}

const Step4 = ({
  setStep,
  control,
  errors,
  register,
  setValue,
  getValues
}: Step4Props) => {
  const {append, remove} = useFieldArray({
    control,
    name: "previousInstitute"
  });
  return (
    <>
      <h3 className="font-medium text-lg flex items-center gap-2">
        <MdOutlineEditNote size={25} />
        Previous Institute Information
      </h3>

      <div className="mt-2 mb-5">
        <table className="w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">Institute Name</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Department</th>
              <th className="border px-4 py-2">Class</th>
              <th className="border px-4 py-2">Year</th>
              <th className="border px-4 py-2">Result</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {getValues().previousInstitute?.map((institute, index) => (
              <tr key={index}>
                <td className="border text-center">
                  <Input 
                    {...register(`previousInstitute.${index}.name` as const, { required: "Institute Name is required" })}
                    placeholder="Institute Name"
                    className={`text-center ${errors?.previousInstitute?.[index]?.name ? "border-red-500" : ""}`}
                  />
                </td>
                <td className="border text-center">
                  <Input
                    {...register(`previousInstitute.${index}.address` as const, { required: "Address is required" })}
                    placeholder="Address"
                    className={`text-center ${errors?.previousInstitute?.[index]?.address ? "border-red-500" : ""}`}
                  />
                </td>
                <td className="border text-center">
                  <Input
                    {...register(`previousInstitute.${index}.department` as const, { required: "Address is required" })}
                    placeholder="Department"
                    className={`text-center ${errors?.previousInstitute?.[index]?.department ? "border-red-500" : ""}`}
                  />
                </td>
                <td className="border text-center">
                  <Input
                    {...register(`previousInstitute.${index}.class` as const, { required: "Address is required" })}
                    placeholder="Class"
                    className={`text-center ${errors?.previousInstitute?.[index]?.class ? "border-red-500" : ""}`}
                  />
                </td>
                <td className="border text-center">
                  <Input
                    {...register(`previousInstitute.${index}.year` as const, { required: "Address is required" })}
                    placeholder="Year"
                    className={`text-center ${errors?.previousInstitute?.[index]?.year ? "border-red-500" : ""}`}
                  />
                </td>
                <td className="border text-center">
                  <SelectComponent
                    control={control}
                    name={`previousInstitute.${index}.result` as const}
                    options={resultOptions}
                    placeholder="Result"
                    className={`text-center ${errors?.previousInstitute?.[index]?.result ? "border-red-500" : ""}`}
                  />
                </td>
                <td className="border text-center">
                  <RxCross2 
                    size={20} 
                    className="mx-auto text-red-500 cursor-pointer"
                    onClick={() => remove(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right mt-2">
          <Button 
            onClick={()=> {
              append({ name: "", address: "", department: "", class: "", year: "", result: "" });
            }} 
            variant="outline"
          >
            <BiPlus /> Add More
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between mt-5">
        <Button onClick={() => setStep(3)} variant="outline"><IoArrowBack size={18} /> Previous</Button>
        <Button onClick={() => setStep(5)}>Next <IoArrowForwardSharp size={18} /></Button>
      </div>
    </>
  );
};

export default Step4;