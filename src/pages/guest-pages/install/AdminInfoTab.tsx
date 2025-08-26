"use client";
import ErrorLabel from "@/components/_core/ErrorLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";
import { MdOutlineArrowForward, MdOutlineHandyman } from "react-icons/md";
import { TInstallAdminFormData } from "./interfaces/formdataInterface";
import { showToast } from "@/utils/showToast";
import { useCreateUsers } from "@/api/user/user.hooks";
import { handleErrorMessage } from "@/utils/handleErrorMessage";

type Props = {
  currStepId: number;
  setCurrStepId: React.Dispatch<React.SetStateAction<number>>;
};

export default function AdminInfoTab({
  currStepId,
  setCurrStepId,
}: Props) {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      retypePassword: ""
    }
  });

  const institute = localStorage.getItem("instituteCreated");
  const instituteId = institute ? JSON.parse(institute)?._id : null;

  const { mutateAsync: createUser, isPending: isCreatingUser } = useCreateUsers();

  // Watch the password field for validation
  const password = watch("password");

  const onSubmit = async (data: TInstallAdminFormData) => {
    if (data.password !== data.retypePassword) {
      showToast("error", "Passwords do not match");
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { retypePassword, ...tempData } = data;

    try {
      const res = await createUser({
        ...tempData,
        instituteId,
        role: "institute-admin"
      });
      if (res.success) {
        setCurrStepId(currStepId + 1);
      } else {
        showToast("error", res?.message || "Failed to create admin");
      }
    } catch (error) {
      showToast("error", handleErrorMessage(error));
    }
  };

  return (
    <div className="">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full"
      >
        <div className="backdrop-blur mt-5">
          <div className="mb-5 flex items-start gap-4 text-base font-semibold text-slate-900 dark:text-slate-200">
            <MdOutlineHandyman size={22} />
            <span>Create the first login credentials</span>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-5 gap-2 gap-y-4 grid md:grid-cols-12"
          >
            <div className="md:col-span-12">
              <Label className="mb-2">Full Name</Label>
              <Input
                type="text"
                placeholder="eg: John Doe"
                {...register("fullName", { required: "Full name is required" })}
                className={`${errors.fullName ? "border-red-500" : ""}`}
              />
              {errors.fullName && <ErrorLabel msg={errors.fullName.message || "Full name is required"} />}
            </div>

            <div className="md:col-span-12">
              <Label className="mb-2">Email</Label>
              <Input
                type="email"
                placeholder="eg: example@gmail.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address"
                  }
                })}
                className={`${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && <ErrorLabel msg={errors.email.message || "Email is required"} />}
            </div>

            <div className="md:col-span-12">
              <Label className="mb-2">Phone</Label>
              <Input
                type="text"
                placeholder="eg: +8801798456380"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^(\+8801|01)\d{9}$/,
                    message: "Please enter a valid Bangladeshi phone number"
                  }
                })}
                className={`${errors.phone ? "border-red-500" : ""}`}
              />
              {errors.phone && <ErrorLabel msg={errors.phone.message || "Phone number is required"} />}
            </div>

            <div className="md:col-span-12">
              <Label className="mb-2">Password</Label>
              <Input
                type="password"
                placeholder="******"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
                className={`${errors.password ? "border-red-500" : ""}`}
              />
              {errors.password && <ErrorLabel msg={errors.password.message || "Password is required"} />}
            </div>

            <div className="md:col-span-12">
              <Label className="mb-2">Retype Password</Label>
              <Input
                type="password"
                placeholder="******"
                {...register("retypePassword", {
                  required: "Please retype your password",
                  validate: (value) =>
                    value === password || "Passwords do not match"
                })}
                className={`${errors.retypePassword ? "border-red-500" : ""}`}
              />
              {errors.retypePassword && <ErrorLabel msg={errors.retypePassword.message || "Please retype your password"} />}
            </div>

            <div className="md:col-span-12 flex items-center justify-end">
              <Button
                type="submit"
                disabled={isCreatingUser}
                className="bg-primary/90 hover:bg-primary text-white"
                isLoading={isCreatingUser}
              > 
                Next
                <MdOutlineArrowForward />
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}