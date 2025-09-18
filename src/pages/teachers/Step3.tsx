import { TTeacherPayload } from "@/api/teachers/teachers.interfaces";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Control, FieldErrors, useFieldArray, UseFormRegister } from "react-hook-form";
import { GoPlus } from "react-icons/go";
import { IoArrowBack, IoArrowForwardSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

type Step3Props = {
  setStep: (step: number) => void;
  control: Control<TTeacherPayload>;
  errors?: FieldErrors<TTeacherPayload>;
  register: UseFormRegister<TTeacherPayload>;
  getValues: () => TTeacherPayload;
}

const Step3 = ({
  setStep,
  control,
  errors,
  register,
  getValues
}: Step3Props) => {
  const { append, remove } = useFieldArray({
    control,
    name: "qualification"
  })

  return (
    <>
      <div className="mt-5">
        <table width={"100%"}>
          <thead>
            <tr>
              <th className="text-left p-2 border">Institute Name</th>
              <th className="text-center p-2 border">Degree</th>
              <th className="text-center p-2 border">Year</th>
              <th className="text-center p-2 border">Result</th>
              <th className="text-center p-2 border">Board</th>
              <th className="text-center p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {getValues().qualification?.map((qual, index) => (
              <tr key={index}>
                <td className="border">
                  <Input
                    {...register(`qualification.${index}.institueName` as const, { required: "Institute Name is required" })}
                    defaultValue={qual.institueName}
                    className={errors?.qualification && errors.qualification[index]?.institueName ? "border-red-500 text-center" : "border-0 text-center"}
                  />
                </td>
                <td className="border">
                  <Input
                    {...register(`qualification.${index}.degree` as const, { required: "Degree is required" })}
                    defaultValue={qual.degree}
                    className={errors?.qualification && errors.qualification[index]?.degree ? "border-red-500 text-center" : "border-0 text-center"}
                  />
                </td>
                <td className="border">
                  <Input
                    type="number"
                    {...register(`qualification.${index}.passingYear` as const, {
                      required: "Passing Year is required",
                      valueAsNumber: true,
                      min: { value: 1900, message: "Year must be at least 1900" },
                      max: { value: new Date().getFullYear(), message: `Year cannot be greater than ${new Date().getFullYear()}` }
                    })}
                    defaultValue={qual.passingYear}
                    className={errors?.qualification && errors.qualification[index]?.passingYear ? "border-red-500 text-center" : "border-0 text-center"}
                  />
                </td>
                <td className="border">
                  <Input
                    type="number"
                    {...register(`qualification.${index}.result` as const, { required: "Result is required", valueAsNumber: true })}
                    defaultValue={qual.result}
                    className={errors?.qualification && errors.qualification[index]?.result ? "border-red-500 text-center" : "border-0 text-center"}
                  /></td>
                <td className="border">
                  <Input
                    type="text"
                    {...register(`qualification.${index}.board` as const, { required: "Board is required" })}
                    defaultValue={qual.board}
                    className={errors?.qualification && errors.qualification[index]?.board ? "border-red-500 text-center" : "border-0 text-center"}
                  /></td>

                <td className="border text-center">
                  <RxCross2 onClick={() => remove(index)} size={20} className="mx-auto text-red-500 cursor-pointer" />
                </td>
              </tr>
            ))}

          </tbody>
        </table>

        <div className="flex items-center justify-end">
          <Button
            variant="outline"
            className="mt-3"
            onClick={() => {
              append({ institueName: "", degree: "", passingYear: new Date().getFullYear(), result: "", board: "" });
            }}
            type="button"
          >
            <GoPlus size={18} /> Add More
          </Button>
        </div>

        <div className="flex items-center justify-between mt-5">
          <Button onClick={() => setStep(2)} variant="outline"><IoArrowBack size={18} /> Previous</Button>
          <Button onClick={() => setStep(4)}>Next <IoArrowForwardSharp size={18} /></Button>
        </div>
      </div>
    </>
  );
};

export default Step3;