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
}