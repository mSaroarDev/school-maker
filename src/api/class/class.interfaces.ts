export type TClassResponse = {
  _id: string;
  instituteId: string;
  displayName: string;
  classValue: string;
  createdBy: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TClassesFullResponse = {
  message: string;
  data: TClassResponse[];
  totalResults: number;
};

export type TCreateClassPayload = {
  displayName: string;
  classValue: string;
}