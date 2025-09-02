import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { LuSwitchCamera } from "react-icons/lu";
import avatarImage from "@/assets/images/avatar.jpeg";
import { useState } from "react";
import { IoArrowBack, IoArrowForwardSharp } from "react-icons/io5";

type Step2Props = {
  step: number;
  setStep: (step: number) => void;
}

const Step2 = ({
  step,
  setStep
}: Step2Props) => {
  const [avatarCldImage, setAvatarCldImage] = useState<string | null>(null);

  return (
    <>
      <div className="mt-5">
        <div className="mt-5 grid grid-cols-12 gap-3">
          <div className="col-span-12 lg:col-span-4">
            <Label>Phone No</Label>
            <Input />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <Label>Emergency Contact</Label>
            <Input />
          </div>
          <div className="col-span-6 lg:col-span-4">
            <Label>Email</Label>
            <Input />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <Label>Father Name</Label>
            <Input />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <Label>Mother Name</Label>
            <Input />
          </div>
          <div className="col-span-12">
            <Label>Current Address</Label>
            <Input />
          </div>
          <div className="col-span-12">
            <Label>Permanant Address</Label>
            <Input />
          </div>
        </div>

        <div className="flex items-center justify-between mt-5">
          <Button onClick={() => setStep(1)} variant="outline"><IoArrowBack size={18} /> Previous</Button>
          <Button onClick={() => setStep(3)}>Next <IoArrowForwardSharp size={18} /></Button>
        </div>
      </div>
    </>
  );
};

export default Step2;