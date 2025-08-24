import CustomToast from "@/components/_core/CustomToast";
import { toast } from "react-toastify";
import type { ToastType } from "@/components/_core/CustomToast";

export const showToast = (type: ToastType = "success", message: string) => {
  toast(
    () => (
      <CustomToast
        message={message}
        type={type}
      />
    ),
    {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    }
  );
}