
export type TNoticeCreatePayload = {
  title: string;
  description: string;
  filUrl?: string;
};

export type TGetNoticesPayload = {
  currPage: number;
  limit: number;
  search?: string;
  instituteId: string;
};

export type TNoticeUpdatePayload = {
  id: string;
  data: Partial<TNoticeCreatePayload>;
};

export type TNoticeResponse = {
  _id: string;
  instituteId: string;
  title: string;
  description: string;
  fileUrl?: string;
  isDeleted?: boolean;
  createdBy: {
    _id: string;
    fullName: string;
    avatar?: string;
    role: string;
  };
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}