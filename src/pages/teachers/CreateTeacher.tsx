"use client";
import { TTeacherPayload } from "@/api/teachers/teachers.interfaces";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import StepProgress from "@/components/_core/StepProgress";
import Card from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserGraduate } from "react-icons/fa6";
import { LuHandshake } from "react-icons/lu";
import { PiMagicWand } from "react-icons/pi";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { TiContacts } from "react-icons/ti";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

const CreateTeacher = () => {
  const params = useParams();
  const teacherId = params ? params.teacherId : null;

  const breadTree = [
    { name: teacherId === "create" ? "Add New Teacher" : "Edit Teacher" },
    { name: "Home", url: "/dashboard" },
    { name: "Teachers", url: "/teachers" },
    { name: "New Teacher" },
  ];

  const [step, setStep] = useState(1);
  const steps = useMemo(() => ([
    { stepId: 1, stepName: "Basic Info", desc: "Enter basic information", icon: <LuHandshake size={18} /> },
    { stepId: 2, stepName: "Contacts", desc: "Provide contact details", icon: <TiContacts size={18} /> },
    { stepId: 3, stepName: "Education", desc: "Add education details", icon: <FaUserGraduate size={18} /> },
    { stepId: 4, stepName: "Salary", desc: "Set salary details", icon: <RiMoneyDollarBoxLine size={18} /> },
  ]), []);

  const defaultValues: TTeacherPayload = {
    "avatar": "https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg",
    "fullName": "John Doe",
    "designation": "Senior Teacher",
    "joiningDate": "2022-08-15",
    "gender": "Male",
    "bloodGroup": "O+",
    "dateOfBirth": "1990-05-20",
    "employeeId": "EMP-12346",
    "nidNumber": "1987654325",
    "phoneNumber": "+8801712345678",
    "email": "johndoe@example.com",
    "familyInformation": {
      "fatherName": "Robert Doe",
      "motherName": "Anna Doe",
      "emergencyContact": "+8801987654321"
    },
    "currentAddress": "House #12, Road #5, Dhaka, Bangladesh",
    "permanentAddress": "Village X, District Y, Bangladesh",
    "qualification": [
      {
        "institueName": "Dhaka University",
        "degree": "B.Sc in Mathematics",
        "passingYear": 2012,
        "result": "3.75",
        "board": "National"
      },
      {
        "institueName": "Dhaka College",
        "degree": "HSC",
        "passingYear": 2008,
        "result": "5.00",
        "board": "Dhaka"
      }
    ],
    "salaryHistory": [
      {
        "salaryType": "Basic",
        "amount": "30000",
        "effectedFrom": "2022-08-15"
      },
      {
        "salaryType": "Allowance",
        "amount": "5000",
        "effectedFrom": "2023-01-01"
      }
    ],
    "isFormer": false,
    "professionalQualifications": [],
    "teachingSubjects": []
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues
  } = useForm({
    defaultValues
  });

  return (
    <div className="w-full max-w-7xl">
      <div>
        <BreadcrumbsComponent breadTree={breadTree} showBackButton />
      </div>

      <div className="grid grid-cols-12 gap-3">
        <Card className="col-span-3 h-fit">
          <StepProgress
            currStepId={step}
            steps={steps}
            direction="col"
          />
        </Card>
        <Card className="col-span-12 lg:col-span-9 h-fit">
          <div className="flex items-center gap-2">
            <PiMagicWand size={18} />
            <h3 className="font-semibold text-base">Add New Teacher</h3>
          </div>

          {step === 1 && <Step1
            step={step}
            setStep={setStep}
            register={register}
            errors={errors}
            control={control}
            setValue={setValue}
          />}

          {step === 2 && <Step2
            step={step}
            setStep={setStep}
            register={register}
            errors={errors}
            control={control}
            setValue={setValue}
          />}

          {step === 3 && <Step3
            step={step}
            setStep={setStep}
            register={register}
            errors={errors}
            control={control}
            setValue={setValue}
            getValues={getValues}
          />}

          {step === 4 && <Step4
            step={step}
            setStep={setStep}
          />}
        </Card>
      </div>
    </div>
  );
};

export default CreateTeacher;