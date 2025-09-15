export type TCreateEventPayload = {
  title: string;
  category: string;
  description: string;
  date: Date | string;
  time: string;
  location: string;
  joinees: string[];
  image: string;
};

export type TEventUpdatePayload = {
  eventId: string;
  data: Partial<TCreateEventPayload>;
};

export type TGetAllEventsPayload = {
  currPage: number;
  limit: number;
  category?: string;
  date?: string;
};

export type TEventResponse = {
  _id: string;
  id: string;
  title: string;
  category: string;
  description: string;
  date: Date | string;
  time: string;
  location: string;
  joinees: string[];
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type TEventInfo = { 
  title: string; 
  start: Date | null | undefined;
  extendedProps: {
    _id?: string;
    category: string;
    description: string;
    time: string;
    location: string;
    joinees: string[];
    image: string;
    createdAt: string;
    updatedAt: string;
  } 
}