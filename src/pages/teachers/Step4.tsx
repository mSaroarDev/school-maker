import { TTeacherPayload } from "@/api/teachers/teachers.interfaces";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "flatpickr/dist/themes/light.css";
import Flatpickr from "react-flatpickr";
import { Control, FieldErrors, useFieldArray, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { GoPlus } from "react-icons/go";
import { IoArrowBack, IoArrowForwardSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

type Step4Props = {
  setStep: (step: number) => void;
  control: Control<TTeacherPayload>;
  errors?: FieldErrors<TTeacherPayload>;
  register: UseFormRegister<TTeacherPayload>;
  setValue: UseFormSetValue<TTeacherPayload>;
  getValues: () => TTeacherPayload;
}

const Step4 = ({
  setStep,
  control,
  errors,
  register,
  setValue,
  getValues
}: Step4Props) => {

  const { append, remove } = useFieldArray({
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
            {getValues().salaryHistory?.map((salary, index) => (
              <tr key={index}>
                <td className="border">
                  <Input
                    {...register(`salaryHistory.${index}.salaryType` as const, { required: "Salary Type is required" })}
                    placeholder="e.g. Basic Salary"
                    defaultValue={salary.salaryType}
                    className={errors?.salaryHistory?.[index]?.salaryType ? "border-2 border-red-500" : "border-0"}
                  />
                </td>
                <td className="border text-center">
                  <Flatpickr
                    onChange={(date) => {
                      const formattedDate = date.length ? date[0].toISOString().split('T')[0] : "";
                      setValue(`salaryHistory.${index}.effectedFrom` as const, formattedDate);
                    }}
                    value={salary.effectedFrom}
                    className={`text-center ${errors?.salaryHistory?.[index]?.effectedFrom ? "w-full border-2 border-red-500 px-3 py-2 rounded-md" : "w-full border-0 px-3 py-2 rounded-md"}`}
                    placeholder="Select Date"
                    options={{
                      dateFormat: "d M, Y",
                      maxDate: new Date(),
                      enableTime: false,
                      mode: "single"
                    }}
                  />
                </td>
                <td className="border text-center">
                  <Input
                    {...register(`salaryHistory.${index}.amount` as const, { required: "Amount is required" })}
                    placeholder="e.g. 25000"
                    defaultValue={salary.amount}
                    className={`text-center ${errors?.salaryHistory?.[index]?.amount ? "border-2 border-red-500" : "border-0"}`}
                  />
                </td>
                <td className="border text-center">
                  <RxCross2 onClick={() => remove(index)} size={20} className="mx-auto text-red-500 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-end">
          <Button
            onClick={() => {
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
          <Button onClick={() => setStep(5)}>Next <IoArrowForwardSharp size={18} /></Button>
        </div>
      </div>
    </>
  );
};

export default Step4;