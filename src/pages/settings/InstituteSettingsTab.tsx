import Card from "@/components/ui/card";
import { useMemo, useState } from "react";
import ClassesSettingsTab from "./ClassesSettingsTab";
import { PiProjectorScreenDuotone } from "react-icons/pi";
import { MdOutlineShowChart } from "react-icons/md";
import { AiOutlineBlock } from "react-icons/ai";

const InstituteSettingsTab = () => {
  const [selectedOption, setSelectedOption] = useState("classes");
  const Options = useMemo(() => ([
    { label: "Classes", value: "classes", icon: PiProjectorScreenDuotone },
    { label: "Sessions", value: "sessions", icon: MdOutlineShowChart },
    { label: "Sections", value: "sections", icon: AiOutlineBlock },
  ]), []);

    return (
        <>
          <div className="grid grid-cols-12 gap-5">
            <Card className="col-span-12 md:col-span-4 lg:col-span-3 px-0 pb-1">
              <h4 className="pt-3 px-4 text-base">Options</h4>
              <hr className="mt-3" />
              <div className="">
                {Options.map((option, index) => (
                  <div
                    onClick={() => setSelectedOption(option.value)} 
                    key={index}
                    className={`flex items-center gap-2 cursor-pointer px-4 py-2 border-l-4 ${selectedOption === option.value ? "border-primary bg-primary/10 font-medium" : "border-transparent"} hover:bg-gray-100` }
                  >
                    {option.icon && <option.icon size={18} />}
                    {option.label}
                  </div>
                ))}
              </div>
            </Card>
            <Card className="col-span-12 md:col-span-8 lg:col-span-5 p-4">
              {selectedOption === "classes" && (
                <ClassesSettingsTab />
              )}
            </Card>
          </div>
        </>
    );
};

export default InstituteSettingsTab;