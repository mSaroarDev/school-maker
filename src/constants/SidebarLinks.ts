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
  const sellerLinks = [
    {
      heading: "General",
      links: [
        {
          label: "Overview",
          icon: LuLayoutDashboard,
          link: "/seller/overview",
        },
        {
          label: "Messages",
          icon: BiMessageDetail,
          link: "/seller/chats",
          // count: 0,
        },
      ],
    },
    {
      heading: "Products",
      links: [
        { label: "My Store", icon: IoStorefrontOutline, link: "/seller/store" },
        { label: "Products", icon: BiGift, link: "/seller/products" },
        // { label: "Orders", icon: GoTasklist, link: "/seller/orders" },
      ],
    },
    {
      heading: "Others",
      links: [
        { label: "Membership", icon: IoShieldCheckmark, link: "/seller/membership" },
        { label: "Payments", icon: RiMoneyDollarBoxLine, link: "/seller/payments" },
      ],
    },
  ];

  const adminLinks = [
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

  if (loggedInAs === "store-admin" || !isAdmin) return sellerLinks;
  if (isAdmin) return adminLinks;

  return [];
};

export default SidebarLinks;
