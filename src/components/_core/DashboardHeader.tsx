import { useTheme } from "next-themes";
import { AiOutlineSun } from "react-icons/ai";
import { BsCloudMoon } from "react-icons/bs";
import { GoBellFill } from "react-icons/go";
import UserDropdown from "./UserDropdown";
import { useAuth } from "@/hooks/useAuth";
import MobileHeader from "./MobileHeader";
import { FiSearch } from "react-icons/fi";

type DashboardHeaderProps = {
  width: number;
}

const DashboardHeader = ({
  width
}: DashboardHeaderProps) => {

  const { setTheme, theme } = useTheme();
  const { user } = useAuth();

  return (
    <>
      <div
        className="hidden py-2 md:flex items-center justify-between pl-5"
        style={{ marginLeft: `${width}px`, transition: 'margin-left 0.3s ease-in-out' }}
      >

        <div className="hidden border border-primary/30 rounded-full md:flex items-center gap-2 px-2">
          <FiSearch size={20} className="text-primary/50" />
          <input
            className="outline-none py-1.5"
            placeholder="Search anything..."
            // value={query}
            // onChange={(e) => setQuery?.(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-end">

          <div onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="size-8 bg-white dark:bg-dark-card rounded-full mr-3 flex items-center justify-center hover:shadow-md cursor-pointer">
            <span>
              {theme === "light" ? (
                <BsCloudMoon size={18} />
              ) : (
                <AiOutlineSun size={18} />
              )}
            </span>
          </div>

          <div className="size-8 bg-white dark:bg-dark-card rounded-full mr-10 flex items-center justify-center hover:shadow-md cursor-pointer">
            <GoBellFill size={18} />
          </div>

          <div className="text-right">
            <h2 className="font-semibold">{user?.fullName}</h2>
            <p className="text-xs capitalize">{user?.role.replace("-", " ")}</p>
          </div>
          <UserDropdown />
        </div>
      </div>

      <div className="md:hidden">
        <MobileHeader />
      </div>
    </>
  );
};

export default DashboardHeader;