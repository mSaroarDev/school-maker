import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { BiEdit } from "react-icons/bi";

export type EventDetailsProps = {
  data: {
    title: string;
    start?: Date | null | undefined;
    extendedProps?: {
      category?: string;
      description?: string;
      time?: string;
      location?: string;
      joinees?: string[];
      image?: string;
      color?: string;
    };
  } | null;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  setEventData: (data: EventDetailsProps["data"]) => void;
  resetAll: () => void;
};

const EventDetails = ({ data, setOpenModal, openModal, setEventData, resetAll }: EventDetailsProps) => {

  const stripHtmlTags = (html: string) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  return (
    <div className="w-full mx-auto p-3">
      
      <div className="mb-6">
        {data?.extendedProps?.image && (
          <div className="w-full h-64 mb-4 overflow-hidden rounded-lg relative border">
            <Image 
              src={data?.extendedProps?.image}
              alt={data?.title || 'Event Image'}
              layout="fill"
              objectFit="contain"
            />
          </div>
        )}
        <div className="flex items-center gap-3 mb-2">
          <div 
            className="w-4 h-4 rounded-full" 
            style={{ backgroundColor: data?.extendedProps?.color || 'green'  }}
          ></div>
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            {data?.extendedProps?.category}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {data?.title}
        </h1>
        <div className="text-gray-600 text-lg leading-relaxed bg-gray-50 p-4 rounded border-l-2 border-primary/60">
          <div dangerouslySetInnerHTML={{ __html: stripHtmlTags(data?.extendedProps?.description ?? "") }} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex items-start gap-3">
          <Calendar className="flex-shrink-0 w-5 h-5 text-gray-500" />
          <div>
            <p className="font-medium text-gray-900">Date</p>
            <p className="text-gray-600">{moment(data?.start).format("DD MMM, YYYY")}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="flex-shrink-0 w-5 h-5 text-gray-500" />
          <div>
            <p className="font-medium text-gray-900">Time</p>
            <p className="text-gray-600">{data?.extendedProps?.time}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="flex-shrink-0 w-5 h-5 text-gray-500" />
          <div>
            <p className="font-medium text-gray-900">Location</p>
            <p className="text-gray-600">{data?.extendedProps?.location}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Users className="flex-shrink-0 w-5 h-5 text-gray-500" />
          <div>
            <p className="font-medium text-gray-900">Attendees</p>
            <p className="text-gray-600">{data?.extendedProps?.joinees?.join(', ')}</p>
          </div>
        </div>
      </div>

      <Button 
        type="button" 
        variant="outline"
        onClick={() => {
          resetAll();
          setOpenModal(!openModal);
          setEventData(data);
       }}
      >
        <BiEdit size={20} /> Edit
      </Button>
    </div>
  );
};

export default EventDetails;