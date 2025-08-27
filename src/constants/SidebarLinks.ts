import { BiGift, BiMessageDetail } from "react-icons/bi";
import { FaFilePdf } from "react-icons/fa6";
import { GoGear } from "react-icons/go";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoShieldCheckmark, IoStorefrontOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiFigmaLogoDuotone } from "react-icons/pi";
import { RiMoneyDollarBoxLine } from "react-icons/ri";

interface LinkItemProps {
  isAdmin?: boolean;
  loggedInAs?: string;
}

const SidebarLinks = ({ isAdmin, loggedInAs }: LinkItemProps) => {

  const adminLinks = [
    {
      heading: "Menu",
      links: [
        {
          label: "Dashboard",
          icon: LuLayoutDashboard,
          link: "/dashboard",
        },
        {
          label: "Teachers",
          icon: BiMessageDetail,
          link: "/teachers",
          // count: 0,
        },
        {
          label: "Students",
          icon: BiMessageDetail,
          link: "/students",
          // count: 0,
        },
        {
          label: "Attendence",
          icon: BiMessageDetail,
          link: "/attendence",
          // count: 0,
        },
        {
          label: "Finance",
          icon: BiMessageDetail,
          link: "/finance",
          // count: 0,
        },
         {
          label: "Notices",
          icon: BiMessageDetail,
          link: "/notices",
          // count: 0,
        },
        {
          label: "Calender",
          icon: BiMessageDetail,
          link: "/calender",
          // count: 0,
        },
        {
          label: "Library",
          icon: BiMessageDetail,
          link: "/library",
          // count: 0,
        },
        {
          label: "Messages",
          icon: BiMessageDetail,
          link: "/messages",
          // count: 0,
        },
      ],
    },
    // {
    //   heading: "Students",
    //   links: [
    //     { label: "My Store", icon: IoStorefrontOutline, link: "/seller/store" },
    //     { label: "Products", icon: BiGift, link: "/seller/products" },
    //     // { label: "Orders", icon: GoTasklist, link: "/seller/orders" },
    //   ],
    // },
    {
      heading: "Others",
      links: [
        { label: "Profile", icon: IoShieldCheckmark, link: "/profile" },
        { label: "Settings", icon: RiMoneyDollarBoxLine, link: "/settings" },
        { label: "Log out", icon: RiMoneyDollarBoxLine, link: "/" },
      ],
    },
  ];

  const superAdminLinks = [
    {
      heading: "General",
      links: [
        { label: "Overview", icon: LuLayoutDashboard, link: "/dashboard/overview" },
        { label: "Users", icon: HiOutlineUserCircle, link: "/dashboard/users" },
        { label: "Stores", icon: IoStorefrontOutline, link: "/dashboard/stores" },
        { label: "Messages", icon: BiMessageDetail, link: "/dashboard/chats" },
      ],
    },
    {
      heading: "Products",
      links: [
        { label: "Products", icon: BiGift, link: "/dashboard/products" },
        // { label: "Orders", icon: GoTasklist, link: "/dashboard/orders" },
        { label: "Categories", icon: LuLayoutDashboard, link: "/dashboard/categories" },
        { label: "Brands", icon: PiFigmaLogoDuotone, link: "/dashboard/brands" },
      ],
    },
    {
      heading: "Others",
      links: [
        { label: "Documents", icon: FaFilePdf, link: "/dashboard/documents" },
        { label: "Membership", icon: IoShieldCheckmark, link: "/dashboard/membership" },
        { label: "Payments", icon: RiMoneyDollarBoxLine, link: "/dashboard/payments" },
      ],
    },
    {
      heading: "Tools",
      links: [
        { label: "Settings", icon: GoGear, link: "/dashboard/settings" },
      ],
    },
  ];

  if(!isAdmin) return adminLinks;
  if (isAdmin) return superAdminLinks;

  return [];
};

export default SidebarLinks;
