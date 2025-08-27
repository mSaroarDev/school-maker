import { GoBellFill } from "react-icons/go";
import UserDropdown from "./UserDropdown";
import { BiSolidMessageAltDetail } from "react-icons/bi";

type DashboardHeaderProps = {
  width: number;
}

const DashboardHeader = ({
  width
}: DashboardHeaderProps) => {
  return (
    <>
      <div
        className="py-2 flex items-center justify-end"
        style={{ marginLeft: `${width}px`, transition: 'margin-left 0.3s ease-in-out' }}
      >
        <div className="flex items-center justify-end">
          <div className="size-8 bg-white rounded-full mr-3 flex items-center justify-center hover:shadow-md cursor-pointer">
            <BiSolidMessageAltDetail size={18} />
          </div>

          <div className="size-8 bg-white rounded-full mr-10 flex items-center justify-center hover:shadow-md cursor-pointer">
            <GoBellFill size={18} />
          </div>

          <div className="text-right">
            <h2 className="font-semibold">Saroar Jahan</h2>
            <p className="text-xs">Software Developer</p>
          </div>
          <UserDropdown />
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;