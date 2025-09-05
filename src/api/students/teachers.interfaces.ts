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
  dateOfBirth?: Date;
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
  instituteName: string;
  department: string;
  class: string;
  from: Date;
  to: Date;
  reasonOfLeaving?: string;
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
}