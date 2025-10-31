import { CalendarDays, ContactRound, House, Settings } from "lucide-react";
import { AiOutlineTeam } from "react-icons/ai";
import { BiStats } from "react-icons/bi";
import { GrUserPolice } from "react-icons/gr";
import { HiLogin, HiOutlineLogout } from "react-icons/hi";
import { IoBookOutline } from "react-icons/io5";
import { LuNotebookPen, LuSquareUserRound, LuWallet } from "react-icons/lu";
import { PiGraduationCapDuotone, PiMoneyWavyBold, PiStudentDuotone } from "react-icons/pi";
import { RiMoneyDollarBoxLine, RiUserCommunityFill } from "react-icons/ri";
import { TbMessage2, TbMoneybag } from "react-icons/tb";

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
            { id: 18, name: "Overview", path: "/finance/overview", icon: LuWallet },
            { id: 19, name: "Due Fees", path: "/finance/due", icon: PiMoneyWavyBold },
            { id: 20, name: "Income", path: "/finance/income", icon: HiLogin },
            { id: 21, name: "Expense", path: "/finance/expense", icon: HiOutlineLogout },
            { id: 23, name: "Salary", path: "/finance/salary", icon: TbMoneybag },
            { id: 22, name: "Reports", path: "/finance/reports", icon: BiStats },
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
          label: "Employees",
          icon: LuSquareUserRound,
          link: "/employees",
          submenu: [
            { id: 23, name: "Teachers", icon: PiGraduationCapDuotone, path: "/employees/teachers", },
            { id: 24, name: "Staffs", path: "/employees/staffs", icon: RiUserCommunityFill },
            { id: 25, name: "Committee", path: "/employees/committee", icon: GrUserPolice },
          ]
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
