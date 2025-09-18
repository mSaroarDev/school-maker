"use client";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import ModuleTabs from "@/components/_core/ModuleTabs";
import { useState } from "react";
import InstituteSettingsTab from "./InstituteSettingsTab";

const SettingsMain = () => {
  const breadTree = [
    { name: "Settings" },
    { name: "Home", url: "/dashboard" },
    { name: "Settings" },
  ];

  const [selectedTab, setSelectedTab] = useState(1);
  const tabs = [
    {
      tabId: 1,
      label: "Basic",
      icon: "",
    },
    {
      tabId: 2,
      label: "Institute",
      icon: ""
    },
    {
      tabId: 3,
      label: "Others",
      icon: ""
    }
  ];

  return (
    <>
      <div>
        <BreadcrumbsComponent breadTree={breadTree} showBackButton />
      </div>

      <div className="__buttons">
        <ModuleTabs
          tabs={tabs}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />

        <div>
          {selectedTab === 2 && (
            <InstituteSettingsTab />
          )}
        </div>
      </div>
    </>
  );
};

export default SettingsMain;