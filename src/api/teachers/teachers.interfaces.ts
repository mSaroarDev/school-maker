export type TTeacherPayloadTeacher = {
  _id?: string;
  instituteId: string;
  avatar: string;
  fullName: string;
  designation: string;
  joiningDate: Date | string;
  gender: string;
  bloodGroup: string;
  dateOfBirth: Date | string;
  employeeId: string;
  nidNumber: string;
  phoneNumber: string;
  email: string;
  familyInformation: {
    fatherName: string;
    motherName: string;
    emergencyContact: string;
  };
  currentAddress: string;
  permanentAddress: string;
  qualification: {
    degree: string;
    institueName: string;
    passingYear: number;
    result: string;
    board: string;
  }[];
  isFormer: boolean;
  leftDate?: Date;
  professionalQualifications: {
    degree: string;
    institution: string;
    passingYear: string;
    result: string;
    board: string;
  }[];
  teachingSubjects: string[];
  salaryHistory: { salaryType: string, amount: string, effectedFrom: string }[];
  remarks?: string;
  isDeleted?: boolean;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TTeacherPayload = {
  avatar: string;
  fullName: string;
  designation: string;
  joiningDate: Date | string;
  gender: string;
  bloodGroup: string;
  dateOfBirth: Date | string;
  employeeId: string;
  nidNumber: string;
  phoneNumber: string;
  email: string;
  familyInformation: {
    fatherName: string;
    motherName: string;
    emergencyContact: string;
  };
  currentAddress: string;
  permanentAddress: string;
  qualification: {
    degree: string;
    institueName: string;
    passingYear: number;
    result: string;
    board: string;
  }[];
  isFormer: boolean;
  leftDate?: Date;
  professionalQualifications: {
    degree: string;
    institution: string;
    passingYear: string;
    result: string;
    board: string;
  }[];
  teachingSubjects: string[];
  salaryHistory: { salaryType: string, amount: string, effectedFrom: string }[];
  remarks?: string;
};

export type TGetTeacherPayload = {
  currPage: number;
  limit: number;
  search?: string;
}