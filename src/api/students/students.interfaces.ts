export type TGetStudentsPayload = {
  currPage?: number;
  limit?: number;
  search?: string;
  studentId?: string;
  class?: string;
  email?: string;
};

type BasicInformation = {
  fatherName?: string;
  motherName?: string;
  gender?: string;
  dateOfBirth?: Date | string;
  religion?: string;
  bloodGroup?: string;
  nidNumber?: string;
};

type TAddress = {
  division?: string;
  district?: string;
  upazila?: string;
  postalCode?: string;
  address?: string;
}

type TContactInformation = {
  phoneNumber?: string;
  email?: string;
  address?: string;
  presentAddress?: TAddress;
  permanentAddress?: TAddress;
};

type TGurdianInformation = {
  name?: string;
  relation?: string;
  phoneNumber?: string;
  email?: string;
  occupation?: string;
};

type TPreviousInstitute = {
  name?: string;
  department?: string;
  class?: string;
  address?: string;
  year?: string;
  result?: string;
}

type TDocument = {
  documentName: string;
  documentUrl: string;
}

export type TStudents = {
  instituteId: string;
  avatar?: string;
  fullName: string;
  studentId: string;
  session: string;
  class: string;
  section: string;
  rollNo: number;
  registrationNo: number;
  basicInformation: BasicInformation;
  contactInformation: TContactInformation;
  gurdianInformation: TGurdianInformation;
  previousInstitute: TPreviousInstitute[];
  financialStatus?: string;
  documents?: TDocument[];
  status: "active" | "inactive" | "graduated" | "suspended" | "expelled";
  isDeleted: boolean;
  createdBy?: string;
};

export type TStudentByIdPayload = {
  studentId: string;
  options: {
    enabled: boolean;
  };
  data: Partial<TStudents>;
};

type TClassResponse = {
  _id: string;
  instituteId: string;
  displayName: string;
  classValue: string;
  createdBy: string | null;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TStudentResponse = {
  _id: string;
  instituteId: string;
  avatar?: string;
  fullName: string;
  studentId: string;
  session: string;
  class: TClassResponse;
  section: string;
  rollNo: number;
  registrationNo: number;
  basicInformation: BasicInformation;
  contactInformation: TContactInformation;
  gurdianInformation: TGurdianInformation;
  previousInstitute: TPreviousInstitute[];
  financialStatus?: string;
  documents?: TDocument[];
  status: "active" | "inactive" | "graduated" | "suspended" | "expelled";
  isDeleted: boolean;
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TStudentsCreatePayload = {
  avatar?: string;
  fullName: string;
  studentId: string;
  session: string;
  class: string;
  section: string;
  rollNo: number;
  registrationNo: number;
  basicInformation: BasicInformation;
  contactInformation: TContactInformation;
  gurdianInformation: TGurdianInformation;
  previousInstitute?: TPreviousInstitute[];
  financialStatus?: string;
  documents?: TDocument[];
  isDeleted?: boolean;
};

export type TGetStudentById = {
  studentId: string;
  options: {
    enabled: boolean;
  }
}

export type TUpdateStudentPayload = {
  studentId: string;
  data: Partial<TStudentsCreatePayload>;
}