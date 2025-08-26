"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa6";
import { HiOutlineMailOpen } from "react-icons/hi";
import { RiKeyLine } from "react-icons/ri";
import loginImage from "@/assets/images/login.svg";
import Image from "next/image";
import { TbLogin2 } from "react-icons/tb";
import { IoMdArrowBack } from "react-icons/io";

const LoginMain = () => {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center px-5 bg-slate-100">
        <main className="max-w-3xl">
          <div className="w-full grid grid-cols-12 rounded-2xl p-2 bg-card">
            <div className="col-span-6 w-full h-full flex items-center justify-center mr-10 bg-[#f4f7ed] rounded-s-xl px-20">
              <div className="w-60 h-60 relative">
                <Image
                  src={loginImage}
                  alt="Login Image"
                  fill
                  className="w-3/4 h-3/4 object-contain"
                />
              </div>
            </div>

            <div className={`col-span-6 w-full p-5`}>
              <div className="w-full">
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
                    className="w-full mt-1 pl-10"
                    type="email"
                    placeholder="Enter your email or phone number"
                  />
                  <HiOutlineMailOpen size={18} className="absolute bottom-2.5 left-3" />
                </div>

                <div className="w-full relative mt-2">
                  <Label>Password</Label>
                  <Input
                    className="w-full mt-1 pl-10"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
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

                <div className="text-right my-2">
                  <Link href="/forgot-password">Forgot Password?</Link>
                </div>

                <Button className="w-full">Login </Button>

                <Link href="/" className="cursor-pointer mt-5 text-center flex items-center justify-center gap-1">
                  <IoMdArrowBack size={18} />
                  <span>Back to Homepage</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default LoginMain;