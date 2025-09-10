"use client";
import { useGetAllEvents } from "@/api/events/events.hooks";
import Card from "@/components/ui/card";
import { useAppSelector } from "@/redux/hooks";
import moment from "moment";
import { useMemo } from "react";

const UpcomingEvents = () => {

  const { calenderEvents } = useAppSelector((state) => state.calender);

  const sortedEvents = useMemo(() => {
    return calenderEvents.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [calenderEvents]);

  const colorPalettes = useMemo(() => [
    { bg: "#f3eeff", border: "#9a64ff" },
    { bg: "#fff1fd", border: "#ff51e5" },
    { bg: "#eafafe", border: "#00bfe9" },
    { bg: "#fef9d8", border: "#ffab3c" },
  ], []);

  return (
    <>
      <Card>
        <h3 className="font-semibold text-lg">Upcoming Events</h3>
        <div className="mt-4 overflow-y-auto max-h-96">
          {calenderEvents ? (
            sortedEvents?.map((event) => {
              const selectedColor = colorPalettes[Number(event?.id) % colorPalettes.length];

              return (
                <div
                  key={event._id}
                  className="mb-3 last:mb-0 flex items-center gap-3 py-2 pr-2 pl-1.5 rounded"
                  style={{ backgroundColor: selectedColor?.bg }}
                >
                  <span
                    style={{ backgroundColor: selectedColor?.border }}
                    className="w-1 min-h-18 inline-block rounded-md"
                  ></span>
                  <div className="w-full flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-black line-clamp-2">{event.title}</p>
                      <p className="text-xs text-gray-600 mt-2 mb-1">
                        {event?.location}
                      </p>
                      <p className="text-xs">{moment(event.date).format("MMM DD, YYYY")}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">
                        {event.time}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <p className="text-sm text-gray-500">No upcoming events</p>
          )}
        </div>
      </Card>
    </>
  );
};

export default UpcomingEvents;