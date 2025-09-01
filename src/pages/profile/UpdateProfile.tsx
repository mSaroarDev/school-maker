"use client";
import { useUpdatProfile } from "@/api/user/user.hooks";
import { TUpdateUserPayload } from "@/api/user/user.interfaces";
import avatarPlaceholder from "@/assets/images/avatar.jpeg";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectComponent from "@/components/ui/select";
import { bloodGroupsOption, gendersOption, religionsOption } from "@/constants/constants";
import { useAuth } from "@/hooks/useAuth";
import { handleErrorMessage } from "@/utils/handleErrorMessage";
import { showToast } from "@/utils/showToast";
import "flatpickr/dist/themes/light.css";
import { CldUploadButton } from 'next-cloudinary';
import Image from "next/image";
import { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import { useForm } from "react-hook-form";
import { BiEdit } from "react-icons/bi";
import { GrContactInfo } from "react-icons/gr";
import { IoCamera } from "react-icons/io5";
import { PiPlugsConnectedBold } from "react-icons/pi";
import { TbLockPassword } from "react-icons/tb";
import ChangePassword from "./ChangePassword";

const UpdateProfile = () => {
  const breadTree = [
    { name: "Profile" },
    { name: "Home", url: "/dashboard" },
    { name: "Profile", url: "/profile" },
    { name: "Update" },
  ];

  const { mutateAsync: updateProfile, isPending: isUpdatingProfile } = useUpdatProfile();
  const { user, dispatch } = useAuth();

  const [avatarUrl, setAvatarUrl] = useState<string>(avatarPlaceholder.src);

  const defaultValues: TUpdateUserPayload = {
    fullName: "",
    email: "",
    phone: "",
    profile: {
      gender: "",
      dateOfBirth: null as Date | null,
      bloodGroup: "",
      religion: "",
      nid: "",
      fatherName: "",
      motherName: "",
      address: "",
      zipCode: "",
      city: "",
      country: "",
      bio: "",
    },
    avatar: avatarUrl,
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    defaultValues
  });

  const handleDateChange = (selectedDates: Date[], dateStr: string) => {
    const selectedDate = selectedDates[0];
    setValue("profile.dateOfBirth", new Date(selectedDate) );
  };


  const onSubmit = async (data: TUpdateUserPayload) => {
    try {
      const res = await updateProfile(data);
      if (res.success) {
        showToast("success", res.message || "Profile updated successfully");
        dispatch({ type: "SET_USER", payload: res?.data });
      }
    } catch (error) {
      showToast("error", handleErrorMessage(error) || "Failed to update profile");
    }
  };

  // Complete useEffect to populate form with user data
  useEffect(() => {
    if (user) {
      setValue("fullName", user.fullName || "");
      setValue("email", user.email || "");
      setValue("phone", user.phone || "");
      setValue("profile.address", user.profile?.address || "");
      setValue("profile.bio", user.profile?.bio || "");
      setValue("profile.bloodGroup", user.profile?.bloodGroup || "");
      setValue("profile.city", user.profile?.city || "");
      setValue("profile.country", user.profile?.country || "");
      setValue("profile.dateOfBirth", user.profile?.dateOfBirth ? new Date(user.profile?.dateOfBirth) : null);
      setValue("profile.fatherName", user.profile?.fatherName || "");
      setValue("profile.motherName", user.profile?.motherName || "");
      setValue("profile.gender", user.profile?.gender || "");
      setValue("profile.religion", user.profile?.religion || "");
      setValue("profile.nid", user.profile?.nid || "");
      setValue("profile.zipCode", user.profile?.zipCode || "");

      // Set avatar URL state
      if (user.avatar) {
        setAvatarUrl(user.avatar);
        setValue("avatar", user.avatar);
      }
    }
  }, [user, setValue]);


  return (
    <>
      <div>
        <BreadcrumbsComponent showBackButton breadTree={breadTree} />
      </div>

      <div className="grid grid-cols-12 gap-5">
        <Card className="col-span-12 lg:col-span-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-12 gap-5"
          >
            <div className="col-span-12 flex items-center gap-2">
              <BiEdit size={18} />
              <h2 className="font-medium text-base">Update Profile</h2>
            </div>

            <div className="col-span-12">
              <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-300">
                <Image
                  src={avatarUrl || avatarPlaceholder}
                  alt="Profile Picture"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  <CldUploadButton
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                    options={{ maxFiles: 1, singleUploadAutoClose: false, sources: ["local", "google_drive"] }}
                    onSuccess={(result) => {
                      console.log("Upload Success: ", result.info);
                      if (typeof result.info === "object" && "secure_url" in result.info) {
                        setAvatarUrl((result.info as { secure_url: string }).secure_url || "");
                        setValue("avatar", (result.info as { secure_url: string }).secure_url || "");
                      } else {
                        setValue("avatar", "");
                      }
                    }}
                    onError={(error) => {
                      console.error("Upload Error: ", error);
                    }}
                  >
                    <IoCamera size={22} className="cursor-pointer" />
                  </CldUploadButton>
                </div>
              </div>
            </div>

            <div className="col-span-12 md:col-span-6">
              <Label>Full Name</Label>
              <Input
                type="text"
                placeholder="Enter your full name"
                className={`${errors.fullName ? "border-red-500" : ""}`}
                {...register("fullName", { required: "Full name is required" })}
              />
            </div>
            <div className="col-span-6 md:col-span-3">
              <Label>Gender</Label>
              <SelectComponent
                name="profile.gender"
                errors={errors}
                control={control}
                options={gendersOption}
                rules={{ required: "Gender is required", deps: ["profile.gender"] }}
              />
            </div>

            <div className="col-span-6 md:col-span-3">
              <Label>Religion</Label>
              <SelectComponent
                name="profile.religion"
                errors={errors}
                control={control}
                options={religionsOption}
                rules={{ required: "Religion is required", deps: ["profile.religion"] }}
              />
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <Label>Father Name</Label>
              <Input
                type="text"
                placeholder="Enter your father name"
                className={`${errors.profile?.fatherName ? "border-red-500" : ""}`}
                {...register("profile.fatherName", { required: "Father Name is Required" })}
              />
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <Label>Mother Name</Label>
              <Input
                type="text"
                placeholder="Enter your mother name"
                className={`${errors.profile?.motherName ? "border-red-500" : ""}`}
                {...register("profile.motherName", { required: "Mother Name is Required" })}
              />
            </div>

            <div className="col-span-6 lg:col-span-4">
              <Label>Blood Group</Label>
              <SelectComponent
                name="profile.bloodGroup"
                errors={errors}
                control={control}
                options={bloodGroupsOption}
                rules={{ required: "Blood Group is required", deps: ["profile.bloodGroup"] }}
              />
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <Label>Date of Birth</Label>
              <Flatpickr
                onChange={handleDateChange}
                className={`w-full px-3 py-2 border ${errors.profile?.dateOfBirth ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Select Date"
                options={{
                  dateFormat: "d M, Y",
                  maxDate: new Date(),
                  enableTime: false,
                  mode: "single"
                }}
              />
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <Label>NID/Birth Reg Number</Label>
              <Input
                type="text"
                placeholder="Enter your NID or Birth Registration Number"
                className={`${errors.profile?.nid ? "border-red-500" : ""}`}
                {...register("profile.nid", { required: "NID/Birth Reg Number is Required" })}
              />
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4"></div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <Label>Country</Label>
              <Input
                type="text"
                placeholder="Enter your country"
                className={`${errors.profile?.country ? "border-red-500" : ""}`}
                {...register("profile.country", { required: "Country is Required" })}
              />
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <Label>City</Label>
              <Input
                type="text"
                placeholder="Enter your city"
                className={`${errors.profile?.city ? "border-red-500" : ""}`}
                {...register("profile.city", { required: "City is Required" })}
              />
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <Label>Address</Label>
              <Input
                type="text"
                placeholder="Enter your address"
                className={`${errors.profile?.address ? "border-red-500" : ""}`}
                {...register("profile.address", { required: "Address is Required" })}
              />
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <Label>Zip Code</Label>
              <Input
                type="number"
                placeholder="Enter your zip code"
                className={`${errors.profile?.zipCode ? "border-red-500" : ""}`}
                {...register("profile.zipCode", { required: "Zip Code is Required" })}
              />
            </div>

            <div className="col-span-12 flex items-center gap-2 mt-5">
              <PiPlugsConnectedBold size={18} />
              <h2 className="font-medium text-base">Connect Info Profile</h2>
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                className={`${errors.email ? "border-red-500" : ""}`}
                {...register("email", { required: "Email is Required" })}
                disabled={true}
              />
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <Label>Phone</Label>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                className={`${errors.phone ? "border-red-500" : ""}`}
                {...register("phone", { required: "Phone is Required" })}
                disabled={true}
              />
            </div>

            <div className="col-span-12 flex items-center gap-2 mt-3">
              <GrContactInfo size={18} />
              <h2 className="font-medium text-base">About Me</h2>
            </div>

            <div className="col-span-12">
              <Label>Bio </Label>
              <Input
                type="text"
                placeholder="Write a short bio about yourself"
                className={`${errors.profile?.bio ? "border-red-500" : ""}`}
                {...register("profile.bio", { required: "Bio is Required" })}
              />
            </div>

            <div className="col-span-12 w-full">
              <Button
                disabled={isUpdatingProfile}
                type="submit"
                isLoading={isUpdatingProfile}
              >
                Update Profile
              </Button>
            </div>
          </form>
        </Card>

        <ChangePassword />
      </div>
    </>
  );
};

export default UpdateProfile;