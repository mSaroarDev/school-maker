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