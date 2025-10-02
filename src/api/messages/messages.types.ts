
export type TMessage = {
  _id?: string;
  instituteId?: string;
  recievers: string[];
  label?: string;
  subject: string;
  text: string;
  folder?: string;
  createdBy?: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type TGetMessagesPayload = {
  currPage: number;
  limit: number;
  folder: string;
  type: string;
  search?: string;
}