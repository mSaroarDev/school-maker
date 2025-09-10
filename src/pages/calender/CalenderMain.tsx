import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import { CalenderBreadTree } from "@/helpers/breadcrumbs";
import SchoolCalendar from "./SchoolCalendar";
import TaskList from "./TaskList";
import UpcomingEvents from "./UpcomingEvents";

const CalenderMain = () => {
  return (
    <>
      <div>
        <BreadcrumbsComponent breadTree={CalenderBreadTree} />
      </div>
      
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-9">
          <SchoolCalendar />
        </div>
        <div className="col-span-3">
          <TaskList />
          <UpcomingEvents />
        </div>
      </div>
    </>
  );
};

export default CalenderMain;