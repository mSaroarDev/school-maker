"use client";
import React, { useMemo, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

/* sample events (dates like your screenshot; update/use API later) */
const sampleEvents = [
  { id: "1", title: "Students Day", start: "2025-08-02", },
  { id: "2", title: "Spring Concert", start: "2025-09-03", },
  { id: "3", title: "Science Fair", start: "2025-09-08", },
  { id: "4", title: "PTA Meeting", start: "2025-09-09" },
  // add more...
];

export default function SchoolCalendar() {
  const calendarRef = useRef(null);
  const [currentView, setCurrentView] = useState("dayGridMonth");

  const changeView = (view: "dayGridMonth" | "timeGridWeek" | "timeGridDay") => {
    setCurrentView(view);
    const api = calendarRef.current?.getApi?.();
    api && api.changeView(view);
  };

  const colorPalettes = useMemo(() => [
    { bg: "#f3eeff", border: "#9a64ff" },
    { bg: "#fff1fd", border: "#ff51e5" },
    { bg: "#eafafe", border: "#00bfe9" },
    { bg: "#fef9d8", border: "#ffab3c" },
  ], []);

  const handleEventClick = (clickInfo: { event: { title: string; start: Date | null | undefined } }) => {
    // placeholder: open a modal or show details
    alert(`${clickInfo.event.title}\n${clickInfo.event.start?.toLocaleString()}`);
  };

  const renderEventContent = (eventInfo: { event: { id: string | number; title: string } }) => {
    const selectedColor = colorPalettes[Number(eventInfo?.event?.id) % colorPalettes.length];

    return (
      <div
        style={{
          backgroundColor: selectedColor?.bg,
        }}
        className="flex items-center gap-2 py-1 pl-1 px-0 bg-primary/15">
        <span className="w-1 h-4 block rounded-md bg-primary"
          style={{ backgroundColor: selectedColor?.border }}
        />
        <div className="truncate text-sm text-black" title={eventInfo.event.title}>
          {eventInfo.event.title}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* top controls (Month / Week / Day) */}
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
        <div className="text-sm text-gray-600">
          {/* optional: current month/year label */}
          <span>{/* Will be populated by programmatic logic if needed */}</span>
        </div>
      </div>

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={currentView}
        headerToolbar={false}             // we use our own controls
        events={sampleEvents}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        height="auto"
        dayMaxEventRows={3}               // show up to N rows per day then "+n more"
        editable={false}
        selectable={false}
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
          }

          .fc .fc-daygrid-day {
            padding: 1rem;
            padding-bottom: 0rem;
            font-weight: 500;
            font-size: 1rem;
          }

          .fc .fc-daygrid-day:hover {
            background-color: #f3f4f6; /* Tailwind's gray-100 */
            cursor: pointer;
          }

          .fc .fc-h-event {
            background-color: transparent;
            border: none;
            padding: 0;
          }
        `}
      </style>
    </div>
  );
}
