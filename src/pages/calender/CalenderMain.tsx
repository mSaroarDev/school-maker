import SchoolCalendar from "./SchoolCalendar";

const CalenderMain = () => {
    return (
        <>
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-9">
          <SchoolCalendar />
          </div>
          <div className="col-span-3"></div>
        </div>
        </>
    );
};

export default CalenderMain;