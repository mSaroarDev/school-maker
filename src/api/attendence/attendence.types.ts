type TAttendenceData = {
  date: string;
  isPresent?: boolean | null;
}

export type TStudent = {
  _id: string;
  avatar: string;
  fullName: string;
}

export type TData = {
  data: TAttendenceData[];
  student: TStudent;
}

export type TAttendenceResponse = {
  success: boolean;
  message: string;
  data: TData[];
  totalResults: number;
};

export type TGetAttendencePayload = {
  classId: string;
  month: string;
  year: string;
  week: string;
};

export type TUpdateAttendencePayload = {
  classId?: string;
  studentId: string
  date: string | Date;
  isPresent: boolean | null;
}