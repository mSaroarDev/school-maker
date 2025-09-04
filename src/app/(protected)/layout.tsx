"use client";
import DashboardHeader from "@/components/_core/DashboardHeader";
import MobileBottomNav from "@/components/_core/MobileBottomNav";
import Sidebar from "@/components/_core/Sidebar";
import { useState } from "react";

type LayoutProps = {
  children: React.ReactNode;
}

const Layout = ({
  children
}: LayoutProps) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Sidebar width={isSidebarOpen ? 250 : 80} toggleSidebar={toggleSidebar} />
      <DashboardHeader width={isSidebarOpen ? 250 : 80}  />
      <div className={`${isSidebarOpen ? 'md:ml-[250px]' : 'md:ml-[80px]'} transition-all duration-300 ease-in-out p-3 md:p-5 pt-14 md:pt-3 pb-16`}>
        {children}
      </div>
      <MobileBottomNav />
    </>
  );
};

export default Layout;