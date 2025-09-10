export type TCreateEventPayload = {
  title: string;
  category: string;
  description: string;
  date: Date | string;
  time: string;
  location: string;
  joinees: string[];
  image: string;
}