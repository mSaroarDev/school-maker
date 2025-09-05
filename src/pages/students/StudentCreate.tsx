"use client";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import StepProgress from "@/components/_core/StepProgress";
import Card from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { CgAttachment } from "react-icons/cg";
import { LuHandshake } from "react-icons/lu";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { RiParentLine } from "react-icons/ri";
import { TiContacts } from "react-icons/ti";
import Step1 from "./Step1";
import { useForm } from "react-hook-form";
import { TStudentsCreatePayload } from "@/api/students/teachers.interfaces";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import { useGetAllClasses } from "@/api/class/class.hooks";

const StudentCreate = () => {
  const breadTree = [
    { name: "Add Student" },
    { name: "Home", url: "/dashboard" },
    { name: "Students", url: "/students" },
    { name: "Add New Students" },
  ];

  const params = useParams();
  const studentId = params?.studentId ? params.studentId : "No ID";
  const [step, setStep] = useState(1);
  const steps = useMemo(() => ([
    { stepId: 1, stepName: "Basic Info", desc: "Enter basic information", icon: <LuHandshake size={18} /> },
    { stepId: 2, stepName: "Contacts", desc: "Provide contact details", icon: <TiContacts size={18} /> },
    { stepId: 3, stepName: "Gardian", desc: "Enter Gurdian Information", icon: <RiParentLine size={18} /> },
    { stepId: 4, stepName: "Previous Institutes", desc: "Previous Institute details", icon: <MdOutlineMapsHomeWork size={18} /> },
    { stepId: 5, stepName: "Documets", desc: "Submic Documents", icon: <CgAttachment size={18} /> },
  ]), []);

  const defaultValues = {
    "avatar": "https://example.com/avatar.jpg",
    "fullName": "John Doe",
    "studentId": "STU-2025-002",
    "session": "64e4b0f123456789abcdef13",
    "class": "64e4b0f123456789abcdef14",
    "section": "64e4b0f123456789abcdef15",
    "rollNo": 10,
    "registrationNo": 202501,
    "basicInformation": {
      "fatherName": "Robert Doe",
      "motherName": "Jane Doe",
      "gender": "Male",
      "dateOfBirth": "2010-05-15",
      "religion": "Islam",
      "bloodGroup": "O+",
      "nidNumber": "1234567890123"
    },
    "contactInformation": {
      "phoneNumber": "+8801712345678",
      "email": "johndoe@example.com",
      "address": "123 Main Street",
      "presentAddress": {
        "division": "Dhaka",
        "district": "Dhaka",
        "upazila": "Dhanmondi",
        "postalCode": "1209",
        "address": "House 12, Road 5"
      },
      "permanentAddress": {
        "division": "Dhaka",
        "district": "Gazipur",
        "upazila": "Tongi",
        "postalCode": "1710",
        "address": "Village Road, House 3"
      }
    },
    "gurdianInformation": {
      "name": "Michael Doe",
      "relation": "Uncle",
      "phoneNumber": "+8801812345678",
      "email": "michael@example.com",
      "occupation": "Business"
    },
    "previousInstitute": [
      {
        "name": "ABC High School",
        "address": "Old Street, Dhaka",
        "department": "Science",
        "class": "8",
        "year": "2022",
        "result": "A+"
      }
    ],
    "financialStatus": "Middle Class",
    "documents": [
      {
        "documentName": "Birth Certificate",
        "documentUrl": "https://example.com/docs/birth-certificate.pdf"
      },
      {
        "documentName": "Previous Marksheet",
        "documentUrl": "https://example.com/docs/marksheet.pdf"
      }
    ]
  };
  const {
    control,
    register,
    setValue,
    getValues,
    formState: { errors },
    handleSubmit
  } = useForm<TStudentsCreatePayload>({
    defaultValues
  });

  return (
    <>
      <div>
        <BreadcrumbsComponent breadTree={breadTree} showBackButton />
      </div>


      <div className="grid grid-cols-12 gap-2 md:gap-3 lg:gap-4">
        <Card className="hidden lg:block col-span-12 lg:col-span-3 h-fit">
          <StepProgress
            currStepId={step}
            steps={steps}
            direction="col"
          />
        </Card>

        <Card className="col-span-12 lg:col-span-9 h-fit">
          {step === 1 && <Step1
            setStep={setStep}
            register={register}
            errors={errors}
            control={control}
            setValue={setValue}
            getValues={getValues}
          />}

          {step === 2 && <Step2
            setStep={setStep}
            register={register}
            errors={errors}
            control={control}
            setValue={setValue}
            getValues={getValues}
          />}

          {step === 3 && <Step3
            setStep={setStep}
            register={register}
            errors={errors}
            control={control}
            setValue={setValue}
            getValues={getValues}
          />}

          {step === 4 && <Step4
            setStep={setStep}
            register={register}
            errors={errors}
            control={control}
            setValue={setValue}
            getValues={getValues}
          />}

          {step === 5 && <Step5
            setStep={setStep}
            register={register}
            errors={errors}
            control={control}
            setValue={setValue}
            getValues={getValues}
            handleSubmit={handleSubmit}
          />}
        </Card>
      </div>
    </>
  );
};

export default StudentCreate;