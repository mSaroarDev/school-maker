export type TInstallInstituteFormData = {
  name: string;
  instituteType: string[];
  stablishedYear: number | null;
  eiin: number | string;
  mpoType: string;
  educationLevel: string[],
  shift: string[],
  instituteContacts: {
    contactNo: string;
  }
}

export type TInstallAdminFormData = {
  instituteId?: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  retypePassword?: string ;
  role?: string;
}

export type TUpdateInstituteFormData = {
  instituteId?: string;
  frontendTheme: string;
}