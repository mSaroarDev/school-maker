
type DashboardHeaderProps = {
  width: number;
}

const DashboardHeader = ({
  width
}: DashboardHeaderProps) => {
    return (
        <>
          <div className="py-5" style={{marginLeft: `${width}px`, transition: 'margin-left 0.3s ease-in-out'}}>
            Heder
          </div>
        </>
    );
};

export default DashboardHeader;