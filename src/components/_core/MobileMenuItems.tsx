"use client";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { RiMenuUnfold2Line } from "react-icons/ri";
import avatarImage from "../../assets/images/avatar.jpeg";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import Image from "next/image";
import SidebarLinks from "@/constants/SidebarLinks";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ILink } from "./Sidebar";


const MobileMenuItems = () => {
  const pathname = usePathname();

  const [loggedInAs, setLoggedInAs] = useState("");

  useEffect(() => {
    const loggedInAs = localStorage.getItem("loggedInAs");
    setLoggedInAs(loggedInAs || "");
  }, []);

  const width = 250;

  const { user, logout, isAdmin } = useAuth();
  const { push } = useRouter();

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <button
            // onClick={onOpen}
            className="md:hidden flex flex-col items-center justify-center text-xs font-medium"
          >
            <RiMenuUnfold2Line size={20} />
            <span className="md:hidden">Menus</span>
          </button>
        </SheetTrigger>
        <SheetContent className="py-4">
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          {user?._id && (
            <div className="px-5">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full relative overflow-hidden">
                  <Image
                    src={user?.avatar || avatarImage}
                    alt="User Avatar"
                    fill
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <div>
                    <h2 className="text-lg font-semibold">{user?.fullName}</h2>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {user?._id ? (
            <div>
              {SidebarLinks({ isAdmin, loggedInAs }).map((section, index) => (
                <div key={index} className="mb-5">
                  <h5 className={`mx-2 ms-8 text-sm transition-all duration-300 ease-in-out ${width === 250 ? "text-gray-700 dark:text-white" : "text-slate-50 dark:text-[#1A202C]"}`}>{section.heading}</h5>
                  <div className="mt-2 px-5">
                    {section.links.map((link: ILink, linkIndex) => (
                      <SheetClose asChild key={linkIndex}>
                        <Link
                          href={link.link}
                          key={linkIndex}
                          className={`flex items-center justify-between px-5 py-2.5 cursor-pointer transition-all duration-150 rounded-lg 
                          ${pathname?.startsWith(link.link) ? "text-black bg-primary-light dark:bg-primary/15" : ""} 
                          ${!pathname?.startsWith(link.link) && "hover:bg-primary/5 hover:text-primary"}`}
                        >
                          <div className="flex items-center gap-3">
                            <link.icon size={20} />
                            {width === 250 && <span>{link.label}</span>}
                          </div>
                          {width === 250 && (
                            <div>
                              {link?.count && (
                                <span className="px-1 h-4 bg-primary text-white grid place-items-center text-xs rounded-full">
                                  {link?.count}
                                </span>
                              )}
                            </div>
                          )}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileMenuItems;

// const SidebarLinks = [
//   {
//     heading: "General",
//     links: [
//       { label: "Home", icon: LuLayoutDashboard, link: "/" },
//       { label: "Pricing", icon: RiMoneyDollarBoxLine, link: "/pricing" },
//       { label: "Stores", icon: IoStorefrontOutline, link: "/stores" },
//       { label: "Chats", icon: BiMessageDetail, link: "/inbox", count: 0 },
//     ],
//   },
//   {
//     heading: "Products",
//     links: [
//       { label: "Products", icon: BiGift, link: "/products" },
//       // { label: "Orders", icon: GoTasklist, link: "/dashboard/orders" },
//       { label: "Categories", icon: LuLayoutDashboard, link: "/categories" },
//       { label: "Brands", icon: PiFigmaLogoDuotone, link: "/brands" },
//     ],
//   },
// ];