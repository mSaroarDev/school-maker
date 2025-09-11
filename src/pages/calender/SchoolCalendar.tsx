"use client";
import { useGetAllEvents } from "@/api/events/events.hooks";
import { Modal } from "@/components/_core/Modal";
import Card from "@/components/ui/card";
import { useAppSelector } from "@/redux/hooks";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useMemo, useRef, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import EventCreateComponent from "./EventCreateComponent";
import EventDetails from "./EventDetails";

export default function SchoolCalendar() {

  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);

  const calendarRef = useRef<FullCalendar | null>(null);
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const [currentDate, setCurrentDate] = useState(new Date());

  const changeView = (view: "dayGridMonth" | "timeGridWeek" | "timeGridDay") => {
    setCurrentView(view);
    const api = calendarRef.current?.getApi?.();
    if (api) {
      api.changeView(view);
    }
  };

  const handlePrev = () => {
    const api = calendarRef.current?.getApi?.();
    if (api) {
      api.prev();
      setCurrentDate(new Date(api.getDate()));
    }
  };
  const handleNext = () => {
    const api = calendarRef.current?.getApi?.();
    if (api) {
      api.next();
      setCurrentDate(new Date(api.getDate()));
    }
  };
  const handleToday = () => {
    const api = calendarRef.current?.getApi?.();
    if (api) {
      api.today();
      setCurrentDate(new Date(api.getDate()));
    }
  };

  useGetAllEvents({
    currPage: 1,
    limit: 100,
  });

  const { calenderEvents } = useAppSelector((state) => state.calender);

  const colorPalettes = useMemo(() => [
    { bg: "#f3eeff", border: "#9a64ff" },
    { bg: "#fff1fd", border: "#ff51e5" },
    { bg: "#eafafe", border: "#00bfe9" },
    { bg: "#fef9d8", border: "#ffab3c" },
  ], []);

  const [showEventModal, setShowEventModal] = useState(false);
  const [eventData, setEventData] = useState<{ title: string; start: Date | null | undefined } | null>(null);
  const handleEventClick = (clickInfo: { event: { title: string; start: Date | null | undefined, extendedProps: unknown } }) => {
    const data = {
      title: clickInfo.event.title,
      start: clickInfo.event.start,
      extendedProps: clickInfo.event.extendedProps,
    }
    setEventData(data);
    setShowEventModal(true);
  };

  const renderEventContent = (eventInfo: { event: { id: string | number; title: string } }) => {
    const selectedColor = colorPalettes[Number(eventInfo?.event?.id) % colorPalettes.length];

    return (
      <div
        style={{
          backgroundColor: selectedColor?.bg,
        }}
        className="flex items-center gap-2 py-1 px-1 bg-primary/15 rounded ms-auto">
        <span className="w-1 h-4 block rounded-md bg-primary"
          style={{ backgroundColor: selectedColor?.border }}
        />
        <div className="truncate text-xs text-black line-clamp-1" title={eventInfo.event.title}>
          {eventInfo.event.title}
        </div>
      </div>
    );
  };

  const monthYear = useMemo(() => {
    const options: Intl.DateTimeFormatOptions = { month: "long", year: "numeric" };
    return currentDate.toLocaleDateString(undefined, options);
  }, [currentDate]);

  return (
    <>
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center bg-gray-100 rounded-lg p-1 gap-1">
            <button
              onClick={() => changeView("dayGridMonth")}
              className={`px-3 py-1 rounded-md text-sm ${currentView === "dayGridMonth" ? "bg-white shadow" : ""}`}
            >
              Month
            </button>
            <button
              onClick={() => changeView("timeGridWeek")}
              className={`px-3 py-1 rounded-md text-sm ${currentView === "timeGridWeek" ? "bg-white shadow" : ""}`}
            >
              Week
            </button>
            <button
              onClick={() => changeView("timeGridDay")}
              className={`px-3 py-1 rounded-md text-sm ${currentView === "timeGridDay" ? "bg-white shadow" : ""}`}
            >
              Day
            </button>
          </div>
          <div className="flex items-center gap-4">
            {/* Month change buttons */}
            <button
              onClick={handlePrev}
              className="more-action-button"
              aria-label="Previous Month"
            >
              <GrFormPrevious />
            </button>
            <span className="text-base font-medium min-w-[120px] text-center">{monthYear}</span>
            <button
              onClick={handleNext}
              className="more-action-button"
              aria-label="Next Month"
            >
              <GrFormNext />
            </button>
            <button
              onClick={handleToday}
              className="more-action-button"
              aria-label="Today"
            >
              Today
            </button>
          </div>
          <div className="text-sm text-gray-600">
            <EventCreateComponent
              openModal={openModal}
              setOpenModal={setOpenModal}
              selectedDate={selectedDate}
            />
          </div>
        </div>

        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={currentView}
          headerToolbar={false}
          events={calenderEvents}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          dateClick={(date) => {
            setOpenModal(true);
            const clickedDate = date.dateStr;
            setSelectedDate(clickedDate);
          }}
          height="auto"
          dayMaxEventRows={3}
          editable={false}
          selectable={false}
          dayCellContent={(arg) => {
            const dayNum = arg.dayNumberText.padStart(2, '0');
            return <span>{dayNum}</span>;
          }}
        />


        <style>
          {`
          .fc .fc-col-header-cell {
            background-color: #f9fafb; /* Tailwind's gray-50 */
            color: #374151; /* Tailwind's gray-700 */
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.875rem; /* text-sm */
            padding: 0.75rem 0;
            border-bottom: 1px solid #e5e7eb; /* gray-200 */
            border-top-left-radius: 0.75rem;
          }

          .fc .fc-daygrid-day {
            padding: 1rem;
            padding-bottom: 0rem;
            font-weight: 500;
          }

          .fc .fc-daygrid-event {
            border-radius: 0.375rem;
            font-size: 0.75rem;
            line-height: 1rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .fc .fc-daygrid-day:hover {
            background-color: #f3f4f6;
            cursor: pointer;
          }

          .fc .fc-h-event {
            background-color: transparent;
            border: none;
            padding: 0;
          }

          .fc .fc-scrollgrid {
            border-radius: 0.75rem;
            overflow: hidden;
          }

          .fc-direction-ltr .fc-daygrid-event.fc-event-end, .fc-direction-rtl .fc-daygrid-event.fc-event-start {
            background-color: transparent;
          }

          .fc .fc-daygrid-body-natural .fc-daygrid-day-events {
            display: flex;
            flex-direction: column;
            align-items: end;
            margin-top: 0.25rem;
          }
        `}
        </style>
      </Card>

      {showEventModal && (
        <>
          <Modal 
            isOpen={showEventModal}
            toggle={() => setShowEventModal(false)}
            title="Event Details"
            description="Details of the selected event."
            showSubmitButton={false}
            showFooter={false}
            sideClick={true}
            size="xl"
          >
            <EventDetails 
              data={eventData} 
            />
          </Modal>
        </>
      )}
    </>

  );
}
