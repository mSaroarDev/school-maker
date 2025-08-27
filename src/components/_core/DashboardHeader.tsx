import UserDropdown from "./UserDropdown";

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
            style={{marginLeft: `${width}px`, transition: 'margin-left 0.3s ease-in-out'}}
          >
            <div className="flex items-center justify-end">
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