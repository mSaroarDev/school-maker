"use client";
import { TTeacherPayload } from "@/api/teachers/teachers.interfaces";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import StepProgress from "@/components/_core/StepProgress";
import Card from "@/components/ui/card";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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
import Step5 from "./Step5";
import { MdOutlineMenuBook } from "react-icons/md";
import { useCreateTeacher, useGetTeacherById, useUpdateTeacher } from "@/api/teachers/teachers.hooks";
import { showToast } from "@/utils/showToast";
import { handleErrorMessage } from "@/utils/handleErrorMessage";
import { CgSpinner } from "react-icons/cg";

const CreateTeacher = () => {
  const params = useParams();
  const teacherId = params ? params.id : null;
  const { back } = useRouter();

  const pathname = usePathname();
  const isTeacher = pathname.includes("/teachers/");

  console.log("isTeacher: ", isTeacher);

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
    { stepId: 5, stepName: "Category", desc: "Select Teacher Category", icon: <MdOutlineMenuBook size={18} /> },
  ]), []);

  const defaultValues: TTeacherPayload = {
    avatar: "",
    fullName: "",
    designation: "",
    joiningDate: "",
    gender: "",
    bloodGroup: "",
    dateOfBirth: "",
    employeeId: "",
    nidNumber: "",
    phoneNumber: "",
    email: "",
    familyInformation: {
      fatherName: "",
      motherName: "",
      emergencyContact: ""
    },
    currentAddress: "",
    permanentAddress: "",
    qualification: [
      {
        institueName: "",
        degree: "",
        passingYear: 0,
        result: "",
        board: ""
      }
    ],
    salaryHistory: [
      {
        salaryType: "",
        amount: "",
        effectedFrom: ""
      }
    ],
    classes: [],
    teachingSubjects: [],
    employeeType: isTeacher ? "teacher" : "staff",
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
    reset
  } = useForm({
    defaultValues
  });


  const { data: teacherData, isPending: isGeting } = useGetTeacherById({
    teacherId: teacherId as string,
    options: { enabled: teacherId !== "create" }
  });

  const { mutateAsync: createTeacher, isPending: isCreating } = useCreateTeacher();
  const { mutateAsync: updateTeacher, isPending: isUpdating } = useUpdateTeacher();

  const handleCreateTeacher = async (data: TTeacherPayload) => {
    try {
      const res = teacherId === "create" ? await createTeacher(data) : await updateTeacher({ teacherId: teacherId as string, data });
      if (res?.success) {
        showToast("success", res?.message || "Teacher created");
        back();
      }
    } catch (error) {
      showToast("error", handleErrorMessage(error));
    }
  };

  useEffect(() => {
    if (teacherId !== "create") {
      reset(teacherData?.data);
    }
  }, [teacherId, teacherData, reset]);

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

          {(teacherId !== "create" && isGeting) ? (
            <div className="w-full h-40 flex items-center justify-center">
              <CgSpinner size={30} className="animate-spin text-primary" />
            </div>
          ) : (
            <>
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
              />}

              {step === 3 && <Step3
                setStep={setStep}
                register={register}
                errors={errors}
                control={control}
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
                errors={errors}
                control={control}
                handleCreateTeacher={handleCreateTeacher}
                handleSubmit={handleSubmit}
                isLoading={isCreating || isUpdating}
              />}
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CreateTeacher;