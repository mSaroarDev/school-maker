"use client";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { RiMenuUnfold2Line } from "react-icons/ri";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import Image from "next/image";


const MobileMenuItems = () => {
  const pathname = usePathname();

  const { user, logout } = useAuth();
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
        <SheetContent>
          {/* <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </SheetDescription>
          </SheetHeader> */}
          {user?._id && (
            <div>
              <div className="flex items-center gap-2">
                <div className="w-24 h-24 rounded-full relative overflow-hidden">

                </div>
              </div>
            </div>
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