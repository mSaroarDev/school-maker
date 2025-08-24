export type TInstallInstituteFormData = {
  name: string;
  instituteType: string;
  stablishedYear: number;
  eiin: number | string;
  mpoType: string;
  educationLevel: string[],
  shift: string[],
}