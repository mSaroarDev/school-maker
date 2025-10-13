"use client";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./ThemeProvider";

type UIProviderProps = {
  children: React.ReactNode;
}

const UIProvider = ({ children }: UIProviderProps) => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      // transition={Bounce}
      />

      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </>
  );
};

export default UIProvider;