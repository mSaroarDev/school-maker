import { TTeacherPayload } from "@/api/teachers/teachers.interfaces";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import SelectComponent from "@/components/ui/select";
import { ClassesOptions, SubjectsOptions } from "@/constants/constants";
import { Terminal } from "lucide-react";
import { useParams } from "next/navigation";
import { Control, FieldErrors } from "react-hook-form";
import { FaQuestion } from "react-icons/fa6";
import { IoArrowBack, IoArrowForwardSharp } from "react-icons/io5";

type Step5Props = {
  setStep: (step: number) => void;
  control: Control<TTeacherPayload>;
  errors?: FieldErrors<TTeacherPayload>;
  handleCreateTeacher: (data: TTeacherPayload) => void;
  handleSubmit: (fn: (data: TTeacherPayload) => void) => (e?: React.BaseSyntheticEvent) => void;
  isLoading: boolean;
}

const Step5 = ({
  setStep,
  control,
  errors,
  handleCreateTeacher,
  handleSubmit,
  isLoading
}: Step5Props) => {

  const params = useParams();
  const employeeType = params.employeeType as string;
  const isTeacher = employeeType === "teachers";

  return (
    <>
      <form onSubmit={handleSubmit(handleCreateTeacher)} className="mt-5">

        {isTeacher ? (
          <>
            <div className="mb-3">
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
          </>
        ) : (
          <Alert variant="destructive">
            <FaQuestion size={22} />
            <AlertTitle>Are you sure!</AlertTitle>
            <AlertDescription>
              No additional information is required for {employeeType}.
              You are going to create {employeeType} profile.
            </AlertDescription>
          </Alert>
        )}


        <div className="flex items-center justify-between mt-5">
          <Button onClick={() => setStep(3)} variant="outline"><IoArrowBack size={18} /> Previous</Button>
          <Button type="submit" isLoading={isLoading} disabled={isLoading}>Submit <IoArrowForwardSharp size={18} /></Button>
        </div>
      </form>
    </>
  );
};

export default Step5;