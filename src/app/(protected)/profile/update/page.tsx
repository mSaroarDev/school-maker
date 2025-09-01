"use client";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectComponent from "@/components/ui/select";
import Image from "next/image";
import { BiEdit } from "react-icons/bi";
import { GrContactInfo } from "react-icons/gr";
import { PiPlugsConnectedBold } from "react-icons/pi";
import { TbLockPassword } from "react-icons/tb";
import Select from "react-select";

const page = () => {
  const breadTree = [
    { name: "Profile" },
    { name: "Home", url: "/dashboard" },
    { name: "Profile", url: "/profile" },
    { name: "Update" },
  ];


  return (
    <>
      <div>
        <BreadcrumbsComponent showBackButton breadTree={breadTree} />
      </div>

      <div className="grid grid-cols-12 gap-5">
        <Card className="col-span-12 lg:col-span-8">
          <form className="grid grid-cols-12 gap-5">
            <div className="col-span-12 flex items-center gap-2">
              <BiEdit size={18} />
              <h2 className="font-medium text-base">Update Profile</h2>
            </div>

            <div className="col-span-12">
              <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-300 animate-pulse">
                <Image
                  src=""
                  alt="Profile Picture"
                  fill
                  className="object-cover "
                />
              </div>
            </div>

            <div className="col-span-12 md:col-span-6">
              <Label>Full Name</Label>
              <Input />
            </div>
            <div className="col-span-6 md:col-span-3">
              <Label>Gender</Label>
              <Select />
            </div>

            <div className="col-span-6 md:col-span-3">
              <Label>Religion</Label>
              <Select />
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <Label>Father Name</Label>
              <Input />
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <Label>Mother Name</Label>
              <Input />
            </div>

            <div className="col-span-6 lg:col-span-4">
              <Label>Blood Group</Label>
              <Select />
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <Label>Date of Birth</Label>
              <Input />
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <Label>NID/Birth Reg Number</Label>
              <Input />
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4"></div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <Label>Country</Label>
              <Input />
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <Label>City</Label>
              <Input />
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <Label>Address</Label>
              <Input />
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <Label>Zip Code</Label>
              <Input />
            </div>

            <div className="col-span-12 flex items-center gap-2 mt-5">
              <PiPlugsConnectedBold size={18} />
              <h2 className="font-medium text-base">Connect Info Profile</h2>
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <Label>Email</Label>
              <Input />
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <Label>Phone</Label>
              <Input />
            </div>

            <div className="col-span-12 flex items-center gap-2 mt-3">
              <GrContactInfo size={18} />
              <h2 className="font-medium text-base">About Me</h2>
            </div>

            <div className="col-span-12">
              <Label>Bio </Label>
              <Input />
            </div>

            <div className="col-span-12">
              <Button >
                Update Profile
              </Button>
            </div>

          </form>
        </Card>

        <Card className="col-span-12 lg:col-span-4 h-fit">
          <form className="grid grid-cols-12 gap-2">
            <div className="col-span-12 flex items-center gap-2 mb-3">
              <TbLockPassword size={18} />
              <h2 className="font-medium text-base">Change Password</h2>
            </div>

            <div className="col-span-12">
              <Label>Current Password</Label>
              <Input type="password" />
            </div>

            <div className="col-span-12">
              <Label>New Password</Label>
              <Input type="password" />
            </div>

            <div className="col-span-12">
              <Label>Confirm New Password</Label>
              <Input type="password" />
            </div>

            <div className="col-span-12">
              <Button >
                Update Password
              </Button>
            </div>
          </form>
        </Card>
      </div>


    </>
  );
};

export default page;