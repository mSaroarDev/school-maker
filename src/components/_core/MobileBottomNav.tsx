"use client";
import { House } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiUsers } from "react-icons/fi";
import { LuNotebookPen, LuWallet } from "react-icons/lu";
import MobileMenuItems from "./MobileMenuItems";

const MobileBottomNav = () => {

  const pathname = usePathname();
  if (!pathname) return null;

  return (
    <div className="fixed md:hidden bottom-0 left-0 right-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300 shadow-lg px-3 py-2 flex justify-around border-t border-gray-200 dark:border-gray-700">
      <Link
        href="/dashboard"
        className={`flex flex-col items-center justify-center text-xs font-medium ${pathname === '/dashboard' ? 'text-primary' : ''}`}
      >
        <House size={20} />
        <span className="">Home</span>
      </Link>

      <Link
        href="/finance"
        className={`flex flex-col items-center justify-center text-xs font-medium ${pathname.startsWith("/finance") ? 'text-primary' : ''}`}
      >
        <LuWallet size={20} />
        <span className="">Finance</span>
      </Link>

      <Link
        href="/notices"
        className={`flex flex-col items-center justify-center text-xs font-medium ${pathname.startsWith("/notices") ? 'text-primary' : ''}`}
      >
        <LuNotebookPen size={20} />
        <span className="">Notices</span>
      </Link>

      <Link
        href="/attendence"
        className={`flex flex-col items-center justify-center text-xs font-medium ${pathname.startsWith("/attendence") ? 'text-primary' : ''}`}
      >
        <FiUsers size={20} />
        <span className="">Attendence</span>
      </Link>

      <MobileMenuItems />
    </div>
  );
};

export default MobileBottomNav;