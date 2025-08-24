import { GiCheckMark } from "react-icons/gi";
import { IoWarningOutline } from "react-icons/io5";
import { MdOutlineErrorOutline } from "react-icons/md";
import React, { JSX } from "react";

type ToastType = "success" | "error" | "warning";

interface CustomToastProps {
  message: string;
  type?: ToastType;
}

const bgColors: Record<ToastType, string> = {
  success: "#e3fcef",
  error: "#ffe8e8",
  warning: "#fff3cd",
};

const borderColors: Record<ToastType, string> = {
  success: "#3ecc91",
  error: "#ff5252",
  warning: "#ffc107",
};

const textColors: Record<ToastType, string> = {
  success: "#257453",
  error: "#ff3131",
  warning: "#664d03",
};

const icons: Record<ToastType, JSX.Element> = {
  success: <GiCheckMark className="text-white size-4" />,
  error: <MdOutlineErrorOutline className="text-white size-4" />,
  warning: <IoWarningOutline className="text-white size-4" />,
};

const titles: Record<ToastType, string> = {
  success: "Success",
  error: "Failed",
  warning: "Warning",
};

export default function CustomToast({ message, type = "success" }: CustomToastProps) {
  return (
    <div
      className="font-en w-full flex overflow-hidden min-h-16"
      style={{ background: bgColors[type] }}
      role="alert"
    >
      <div
        className="w-8 flex items-center justify-center p-2"
        style={{ background: borderColors[type] }}
      >
        {icons[type]}
      </div>
      <div
        className="w-full text-sm px-3 py-2 pr-5 flex flex-col justify-center"
        style={{ color: textColors[type] }}
      >
        <div className="font-semibold">{titles[type]}</div>
        <div>{message}</div>
      </div>
    </div>
  );
}