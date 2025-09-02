"use client";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import Card from "@/components/ui/card";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { PiMagicWand } from "react-icons/pi";
import avatarImage from "@/assets/images/avatar.jpeg";
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

  const steps = useMemo(() => ([
    { stepId: 1, stepName: "Basic Info", desc: "Enter basic information", icon: <LuHandshake size={18} /> },
    { stepId: 2, stepName: "Contacts", desc: "Provide contact details", icon: <TiContacts size={18} /> },
    { stepId: 3, stepName: "Education", desc: "Add education details", icon: <FaUserGraduate size={18} /> },
    { stepId: 4, stepName: "Salary", desc: "Set salary details", icon: <RiMoneyDollarBoxLine size={18} /> },
  ]), []);

  const [avatarCldImage, setAvatarCldImage] = useState<string | null>(null);

  return (
    <div className="w-full max-w-7xl">
      <div>
        <BreadcrumbsComponent breadTree={breadTree} showBackButton />
      </div>

      <div className="grid grid-cols-12 gap-3">
        <Card className="col-span-3">
          <StepProgress
            currStepId={1}
            steps={steps}
            direction="col"
          />
        </Card>
        <Card className="col-span-12 lg:col-span-9">
          <div className="flex items-center gap-2">
            <PiMagicWand size={18} />
            <h3 className="font-semibold text-base">Add New Teacher</h3>
          </div>

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
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreateTeacher;