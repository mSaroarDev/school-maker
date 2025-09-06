
export type TSession = {
  _id: string;
  instituteId: string;
  sessionName: string;
  year: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export type TSessionsFullResponse = {
  message: string;
  data: TSession[];
  totalResults: number;
};

export type TCreateSessionPayload = {
  sessionName: string;
  year: number;
}