import { CalendarDays, ContactRound, House, Settings } from "lucide-react";
import { AiOutlineTeam } from "react-icons/ai";
import { HiLogin, HiOutlineLogout } from "react-icons/hi";
import { IoBookOutline } from "react-icons/io5";
import { LuNotebookPen, LuWallet } from "react-icons/lu";
import { PiGraduationCapDuotone, PiMoneyWavyBold, PiStudentDuotone } from "react-icons/pi";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { TbMessage2 } from "react-icons/tb";

interface LinkItemProps {
  isAdmin?: boolean;
  loggedInAs?: string;
}

const SidebarLinks = ({ isAdmin }: LinkItemProps) => {

  const adminLinks = [
    {
      heading: "Menu",
      links: [
        {
          label: "Dashboard",
          icon: House,
          link: "/dashboard",
        },
        {
          label: "Teachers",
          icon: PiGraduationCapDuotone,
          link: "/teachers",
        },
        {
          label: "Students",
          icon: PiStudentDuotone,
          link: "/students",
        },
        {
          label: "Attendence",
          icon: AiOutlineTeam,
          link: "/attendence",
        },
        {
          label: "Finance",
          icon: RiMoneyDollarBoxLine,
          link: "/finance",
          submenu: [
            { id: 18, name: "Recent Transactions", path: "/finance", icon: LuWallet },
            { id: 19, name: "Due Fees", path: "/finance/due", icon: PiMoneyWavyBold },
            { id: 19, name: "Income", path: "/finance/income", icon: HiLogin },
            { id: 19, name: "Expense", path: "/finance/income", icon: HiOutlineLogout },
          ]
        },
        {
          label: "Notices",
          icon: LuNotebookPen,
          link: "/notices",
        },
        {
          label: "Calender",
          icon: CalendarDays,
          link: "/calender",
        },
        {
          label: "Library",
          icon: IoBookOutline,
          link: "/library",
        },
        {
          label: "Messages",
          icon: TbMessage2,
          link: "/messages",
        },
      ],
    },
    {
      heading: "Others",
      links: [
        { label: "Profile", icon: ContactRound, link: "/profile" },
        { label: "Settings", icon: Settings, link: "/settings" },
      ],
    },
  ];

  // const superAdminLinks = [
  //   {
  //     heading: "General",
  //     links: [
  //       { label: "Overview", icon: LuLayoutDashboard, link: "/dashboard/overview" },
  //       { label: "Users", icon: HiOutlineUserCircle, link: "/dashboard/users" },
  //       { label: "Stores", icon: IoStorefrontOutline, link: "/dashboard/stores" },
  //       { label: "Messages", icon: BiMessageDetail, link: "/dashboard/chats" },
  //     ],
  //   },
  //   {
  //     heading: "Products",
  //     links: [
  //       { label: "Products", icon: BiGift, link: "/dashboard/products" },
  //       // { label: "Orders", icon: GoTasklist, link: "/dashboard/orders" },
  //       { label: "Categories", icon: LuLayoutDashboard, link: "/dashboard/categories" },
  //       { label: "Brands", icon: PiFigmaLogoDuotone, link: "/dashboard/brands" },
  //     ],
  //   },
  //   {
  //     heading: "Others",
  //     links: [
  //       { label: "Documents", icon: FaFilePdf, link: "/dashboard/documents" },
  //       { label: "Membership", icon: IoShieldCheckmark, link: "/dashboard/membership" },
  //       { label: "Payments", icon: RiMoneyDollarBoxLine, link: "/dashboard/payments" },
  //     ],
  //   },
  //   {
  //     heading: "Tools",
  //     links: [
  //       { label: "Settings", icon: GoGear, link: "/dashboard/settings" },
  //     ],
  //   },
  // ];

  if (!isAdmin) return adminLinks;
  if (isAdmin) return adminLinks;

  return [];
};

export default SidebarLinks;
