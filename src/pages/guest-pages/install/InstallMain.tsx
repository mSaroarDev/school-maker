"use client";

import StepProgress from "@/components/_core/StepProgress";
import { useState } from "react";
import { BiSolidSchool } from "react-icons/bi";
import { GrUserAdmin } from "react-icons/gr";
import { TbLayout } from "react-icons/tb";

const InstallMain = () => {
  const steps = [
    { stepId: 1, stepName: "Institute Informations", desc: "Enter basic details.", icon: <BiSolidSchool size={20} /> },
    { stepId: 2, stepName: "Admin Information", desc: "Choose the locations.", icon: <GrUserAdmin size={20} /> },
    { stepId: 3, stepName: "Theme Settings", desc: "Value of this item", icon: <TbLayout size={20} /> },
  ];

  const [currStepId, setCurrStepId] = useState(1);

  const [formdata, setFormdata] = useState({

  });

  return (
    <>
      <div className="w-full max-w-3xl mx-auto bg-card border-t-4 border-primary/20">
        <StepProgress direction="row" className="col-span-3 lg:col-span-2 pr-2" steps={steps} currStepId={currStepId} />
      </div>
    </>
  );
};

export default InstallMain;