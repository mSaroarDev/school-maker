import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { LuSwitchCamera } from "react-icons/lu";
import avatarImage from "@/assets/images/avatar.jpeg";
import { useState } from "react";
import { IoArrowForwardSharp } from "react-icons/io5";

type Step1Props = {
  step: number;
  setStep: (step: number) => void;
}

const Step1 = ({
  step,
  setStep
}: Step1Props) => {
  const [avatarCldImage, setAvatarCldImage] = useState<string | null>(null);

  return (
    <>
      <div className="mt-5">
        <div className="w-24 h-24 relative rounded-full overflow-hidden ring ring-primary/40">
          <Image
            src={avatarCldImage || avatarImage}
            alt="Avatar"
            fill
            className="object-cover"
          />

          <div className="absolute bg-black/30 top-0 bottom-0 left-0 right-0 flex items-center justify-center">
            <LuSwitchCamera size={22} />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-12 gap-3">
          <div className="col-span-12 lg:col-span-6">
            <Label>Full Name</Label>
            <Input />
          </div>
          <div className="col-span-6 lg:col-span-3">
            <Label>Designation</Label>
            <Input />
          </div>
          <div className="col-span-6 lg:col-span-3">
            <Label>Employee Id</Label>
            <Input />
          </div>
          <div className="col-span-6 lg:col-span-4">
            <Label>Joining Date</Label>
            <Input />
          </div>
          <div className="col-span-6 lg:col-span-4">
            <Label>Gender</Label>
            <Input />
          </div>
          <div className="col-span-6 lg:col-span-4">
            <Label>Blood Group</Label>
            <Input />
          </div>
          <div className="col-span-6 lg:col-span-4">
            <Label>Date of Birth</Label>
            <Input />
          </div>
          <div className="col-span-6 lg:col-span-4">
            <Label>NID Number</Label>
            <Input />
          </div>
        </div>

        <div className="flex items-center justify-end mt-5">
          {/* <Button variant="outline"><IoArrowBack size={18} /> Previous</Button> */}
          <Button onClick={() => setStep(2)}>Next <IoArrowForwardSharp size={18} /></Button>
        </div>
      </div>
    </>
  );
};

export default Step1;