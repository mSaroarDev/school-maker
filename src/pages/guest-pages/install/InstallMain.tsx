"use client";

import StepProgress from "@/components/_core/StepProgress";
import { useState } from "react";
import { BiSolidSchool } from "react-icons/bi";
import { GrUserAdmin } from "react-icons/gr";
import { LuHandshake } from "react-icons/lu";
import { TbLayout } from "react-icons/tb";
import AgreementTab from "./AgreementTab";
import InstituteInfoTab from "./InstituteInfoTab";
import { FormData } from "./interfaces/formdataInterface";
import AdminInfoTab from "./AdminInfoTab";
import ThemeSettingsTab from "./ThemeSettingsTab";

const InstallMain = () => {
  const steps = [
    { stepId: 1, stepName: "Agreements", desc: "Agree with terms.", icon: <LuHandshake size={20} /> },
    { stepId: 2, stepName: "Institute Informations", desc: "Enter basic details.", icon: <BiSolidSchool size={20} /> },
    { stepId: 3, stepName: "Admin Information", desc: "Enter credentials.", icon: <GrUserAdmin size={20} /> },
    { stepId: 4, stepName: "Theme Settings", desc: "Choose colors and themes", icon: <TbLayout size={20} /> },
  ];

  const [currStepId, setCurrStepId] = useState(1);

  const [formdata, setFormdata] = useState<FormData>({
    name: "",
    instituteType: [],
    stablishedYear: null as number | null,
    address: "",
    district: "",
    zip: "",
    religion: "",
    educationLevel: [],
    shift: [],
    instituteContacts: {
      contactNo: ""
    },
    subdomain: "",
    basicInfo: {},
  });

  return (
    <>
      <div className="w-full max-w-4xl mx-auto bg-card border-t-4 border-primary/20 p-3 md:p-5 lg:p-10">
        <StepProgress direction="row" className="col-span-3 lg:col-span-2 pr-2" steps={steps} currStepId={currStepId} />

        <div>
          {currStepId === 1 && <AgreementTab
            currStepId={currStepId}
            setCurrStepId={setCurrStepId}
          />}

          {currStepId === 2 && <InstituteInfoTab
            currStepId={currStepId}
            setCurrStepId={setCurrStepId}
            formdata={formdata}
            setFormdata={setFormdata}
          />}

          {currStepId === 3 && <AdminInfoTab
            currStepId={currStepId}
            setCurrStepId={setCurrStepId}
            formdata={formdata}
            setFormdata={setFormdata}
          />}

          {currStepId === 4 && <ThemeSettingsTab
            currStepId={currStepId}
            setCurrStepId={setCurrStepId}
            formdata={formdata}
            setFormdata={setFormdata}
          />}
        </div>
      </div>
    </>
  );
};

export default InstallMain;