"use client";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import Card from "@/components/ui/card";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { PiMagicWand } from "react-icons/pi";
import { LuHandshake, LuSwitchCamera } from "react-icons/lu";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BiSolidSchool } from "react-icons/bi";
import { GrUserAdmin } from "react-icons/gr";
import { TbLayout } from "react-icons/tb";
import StepProgress from "@/components/_core/StepProgress";
import { TiContacts } from "react-icons/ti";
import { FaUserGraduate } from "react-icons/fa6";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { IoArrowBack, IoArrowForwardSharp } from "react-icons/io5";
import Step1 from "./Step1";
import Step2 from "./Step2";

const CreateTeacher = () => {
  const params = useParams();
  const teacherId = params ? params.teacherId : null;
  console.log(teacherId);

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

  return (
    <div className="w-full max-w-7xl">
      <div>
        <BreadcrumbsComponent breadTree={breadTree} showBackButton />
      </div>

      <div className="grid grid-cols-12 gap-3">
        <Card className="col-span-3">
          <StepProgress
            currStepId={step}
            steps={steps}
            direction="col"
          />
        </Card>
        <Card className="col-span-12 lg:col-span-9">
          <div className="flex items-center gap-2">
            <PiMagicWand size={18} />
            <h3 className="font-semibold text-base">Add New Teacher</h3>
          </div>

          {step === 1 && <Step1
            step={step}
            setStep={setStep}
          />}

          {step === 2 && <Step2
            step={step}
            setStep={setStep}
          />}
        </Card>
      </div>
    </div>
  );
};

export default CreateTeacher;