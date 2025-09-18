"use client";
import { useEffect, useMemo, useState } from "react";
import { BiSolidSchool } from "react-icons/bi";
import { GrUserAdmin } from "react-icons/gr";
import { LuHandshake } from "react-icons/lu";
import { TbLayout } from "react-icons/tb";
import AdminInfoTab from "./AdminInfoTab";
import AgreementTab from "./AgreementTab";
import InstituteInfoTab from "./InstituteInfoTab";
import ThemeSettingsTab from "./ThemeSettingsTab";

const InstallMain = () => {
  const steps = useMemo(() => ([
    { stepId: 1, stepName: "Agreement", icon: <LuHandshake size={18} /> },
    { stepId: 2, stepName: "Institute Info", icon: <BiSolidSchool size={18} /> },
    { stepId: 3, stepName: "Admin Info", icon: <GrUserAdmin size={18} /> },
    { stepId: 4, stepName: "Theme Settings", icon: <TbLayout size={18} /> },
  ]), []);

  const [currStepId, setCurrStepId] = useState(1);

  const getProgress = () => {
    return (currStepId / steps.length) * 100;
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = `Install - ${steps.find(s => s.stepId === currStepId)?.stepName || "Install"}`;
      const isInstituteCreated = window.localStorage.getItem("instituteCreated");
      if (isInstituteCreated) {
        if (currStepId === 1) {
          setCurrStepId(3);
        }
      }
    }
  }, [currStepId, steps]);

  return (
    <>
      <div className={`w-full ${currStepId === 3 ? "max-w-sm" : "max-w-3xl"} mx-auto bg-card p-3 pt-0 px-0 my-5`}>
        <div className="flex items-center">
          <div className={`bg-black h-1`} style={{
            width: `${getProgress()}%`
          }}></div>
          <div className="bg-black/10 h-1"
            style={{
              width: `${100 - getProgress()}%`
            }}
          ></div>
        </div>

        <div className="px-5">
          {currStepId === 1 && <AgreementTab
            currStepId={currStepId}
            setCurrStepId={setCurrStepId}
          />}

          {currStepId === 2 && <InstituteInfoTab
            currStepId={currStepId}
            setCurrStepId={setCurrStepId}
          />}

          {currStepId === 3 && <AdminInfoTab
            currStepId={currStepId}
            setCurrStepId={setCurrStepId}
          />}

          {currStepId === 4 && <ThemeSettingsTab
            currStepId={currStepId}
            setCurrStepId={setCurrStepId}
          />}
        </div>
      </div>
    </>
  );
};

export default InstallMain;