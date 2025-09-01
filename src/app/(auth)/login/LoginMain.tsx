"use client";
import { TLoginPayload, TLoginResponse } from "@/api/user/user.interfaces";
import loginImage from "@/assets/images/login.svg";
import ErrorLabel from "@/components/_core/ErrorLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { handleErrorMessage } from "@/utils/handleErrorMessage";
import { showToast } from "@/utils/showToast";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa6";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoMdArrowBack } from "react-icons/io";
import { RiKeyLine } from "react-icons/ri";
import { TbLogin2 } from "react-icons/tb";

const LoginMain = () => {
  const { replace } = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const {login} = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TLoginPayload) => {
    if (!data.email || !data.password) {
      return;
    }

    try {
      const res = await login(data);
      if (res?.success) {
        showToast("success", res?.message || "Login successful");
        replace("/dashboard");
        handleLoginSuccess(res);
        console.log("Login successful, redirecting to dashboard...", res);
      }
    } catch (error) {
      showToast("error", handleErrorMessage(error) || "Login failed");
    }
  };

  const handleLoginSuccess = (res: TLoginResponse) => {
    localStorage.setItem("token", res?.data?.token);
    Cookies.set("token", res?.data?.token);
  }

  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center px-5 bg-slate-100">
        <main className="max-w-3xl">
          <div className="w-full grid grid-cols-12 rounded-2xl p-2 bg-card">
            <div className="hidden col-span-6 w-full h-full md:flex items-center justify-center mr-10 bg-[#f4f7ed] rounded-s-xl px-20">
              <div className="w-60 h-60 relative">
                <Image
                  src={loginImage}
                  alt="Login Image"
                  fill
                  className="w-3/4 h-3/4 object-contain"
                />
              </div>
            </div>

            <div className={`col-span-12 md:col-span-6 w-full p-5`}>
              <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex-shrink-0 w-14 h-14 rounded-md bg-[#f4f7ed] flex items-center justify-center">
                    <TbLogin2 size={25} />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold">Welcome Back!</h1>
                    <p className="text-sm text-muted-foreground">
                      Login to your account
                    </p>
                  </div>
                </div>

                <div className="w-full relative">
                  <Label>Email or Phone no</Label>
                  <Input
                    type="email"
                    placeholder="Enter your email or phone number"
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                    className={`w-full mt-1 pl-10 ${errors.email ? "border-red-500" : ""}`}
                    // disabled={isLogining}
                  />
                  <HiOutlineMailOpen size={18} className="absolute bottom-2.5 left-3" />
                </div>

                {errors.email && <ErrorLabel msg={
                  errors.email?.type === "pattern"
                    ? "Invalid email address"
                    : "Email or Phone no is required"
                } />}

                <div className="w-full relative mt-2">
                  <Label>Password</Label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password", { required: true, minLength: 6 })}
                    className={`w-full mt-1 pl-10 ${errors.password ? "border-red-500" : ""}`}
                    // disabled={isLogining}
                  >
                  </Input>
                  <RiKeyLine size={18} className="absolute bottom-2.5 left-3" />
                  <div className="absolute bottom-2.5 right-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={18} />
                    ) : (
                      <FaRegEye />
                    )}
                  </div>
                </div>
                {errors.password && <ErrorLabel msg={
                  errors.password?.type === "minLength"
                    ? "Password must be at least 6 characters"
                    : "Password is required"
                } />}

                <div className="text-right my-2">
                  <Link href="/forgot-password">Forgot Password?</Link>
                </div>

                <Button type="submit" className="w-full">Login </Button>

                <Link href="/" className="cursor-pointer mt-5 text-center flex items-center justify-center gap-1">
                  <IoMdArrowBack size={18} />
                  <span>Back to Homepage</span>
                </Link>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default LoginMain;