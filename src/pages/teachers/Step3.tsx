import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { LuSwitchCamera } from "react-icons/lu";
import avatarImage from "@/assets/images/avatar.jpeg";
import { useState } from "react";
import { IoArrowBack, IoArrowForwardSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { GoPlus } from "react-icons/go";

type Step3Props = {
  step: number;
  setStep: (step: number) => void;
}

const Step3 = ({
  step,
  setStep
}: Step3Props) => {
  const [avatarCldImage, setAvatarCldImage] = useState<string | null>(null);

  return (
    <>
      <div className="mt-5">
        <table width={"100%"}>
          <thead>
            <tr>
              <th className="text-left p-2 border">Institute Name</th>
              <th className="text-center p-2 border">Degree</th>
              <th className="text-center p-2 border">Year</th>
              <th className="text-center p-2 border">Result</th>
              <th className="text-center p-2 border">Board</th>
              <th className="text-center p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border"><Input className="border-0" /></td>
              <td className="border"><Input className="border-0" /></td>
              <td className="border"><Input className="border-0" /></td>
              <td className="border"><Input className="border-0" /></td>
              <td className="border"><Input className="border-0" /></td>
              <td className="border text-center">
                <RxCross2 size={20} className="mx-auto text-red-500 cursor-pointer" />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex items-center justify-end">
          <Button variant="outline" className="mt-3"><GoPlus size={18} /> Add More</Button>
        </div>

        <div className="flex items-center justify-between mt-5">
          <Button onClick={() => setStep(2)} variant="outline"><IoArrowBack size={18} /> Previous</Button>
          <Button onClick={() => setStep(4)}>Next <IoArrowForwardSharp size={18} /></Button>
        </div>
      </div>
    </>
  );
};

export default Step3;