import CustomToast from "@/components/_core/CustomToast";
import { toast } from "react-toastify";

export const showSuccess = (message) => {
    toast(
      ({ closeToast }) => (
        <CustomToast
          message={message}
          type="success"
          onClose={closeToast}
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
  };

  export const showError = (message) => {
    toast(
      ({ closeToast }) => (
        <CustomToast
          message={message}
          type="error"
          onClose={closeToast}
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
  };

  export const showWarning = (message) => {
    toast(
      ({ closeToast }) => (
        <CustomToast
          message={message}
          type="warning"
          onClose={closeToast}
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
  };