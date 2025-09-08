
export type TNoticeCreatePayload = {
  title: string;
  description: string;
  filUrl?: string;
};

export type TGetNoticesPayload = {
  currPage: number;
  perPage: number;
  search?: string;
};

export type TNoticeUpdatePayload = {
  id: string;
  data: Partial<TNoticeCreatePayload>;
}