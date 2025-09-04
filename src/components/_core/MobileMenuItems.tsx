"use client";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { BiGift, BiMessageDetail } from "react-icons/bi";
import { IoStorefrontOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiFigmaLogoDuotone } from "react-icons/pi";
import { RiMenuUnfold2Line, RiMoneyDollarBoxLine } from "react-icons/ri";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";


const MobileMenuItems = () => {
  const pathname = usePathname();

  const { user, logout } = useAuth();
  const { push } = useRouter();

  const handleButtonClick = () => {
    if (user?._id) {
      logout();
    } else {
      push("/login");
    }
  }

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

          {/* <button
            // onClick={onOpen}
            className="more-action-button hidden md:flex flex-col items-center justify-center text-xs font-medium gap-1"
          >
            <RiMenuUnfold2Line size={20} />
            <span className="md:hidden">Menus</span>
          </button> */}
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </SheetDescription>
          </SheetHeader>
          <div>

          </div>
          {/* <SheetFooter>
            <Button type="submit">Save changes</Button>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter> */}
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