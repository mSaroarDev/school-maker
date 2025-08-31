import { useTheme } from "next-themes";
import { AiOutlineSun } from "react-icons/ai";
import { BsCloudMoon } from "react-icons/bs";
import { GoBellFill } from "react-icons/go";
import UserDropdown from "./UserDropdown";
import { useAuth } from "@/hooks/useAuth";

type DashboardHeaderProps = {
  width: number;
}

const DashboardHeader = ({
  width
}: DashboardHeaderProps) => {

  const { setTheme, theme } = useTheme();
  const { user } = useAuth();
  console.log(user);

  return (
    <>
      <div
        className="py-2 flex items-center justify-end"
        style={{ marginLeft: `${width}px`, transition: 'margin-left 0.3s ease-in-out' }}
      >
        <div className="flex items-center justify-end">
          <div className="size-8 bg-white dark:bg-dark-card rounded-full mr-3 flex items-center justify-center hover:shadow-md cursor-pointer">
            <span onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
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
            <p className="text-xs">{user?.designation}</p>
          </div>
          <UserDropdown />
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;