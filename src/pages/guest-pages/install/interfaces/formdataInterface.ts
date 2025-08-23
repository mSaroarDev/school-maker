export interface InstituteContacts {
  contactNo: string;
  whatsApp?: string;
  email?: string;
  website?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
  googleMap?: string;
}

export interface BasicInfo {
  logo?: string;
  bannerImages?: string[];
  about?: string;
  briefDescription?: string;
  mission?: string;
  vision?: string;
}

export interface ThemeColors {
  primary?: string;
  forground?: string;
}

export interface FormData {
  name: string;
  instituteType: string[];
  stablishedYear: number | null;
  eiin?: string;
  address: string;
  district: string;
  zip: string;
  religion: string;
  mpoType?: string;
  educationLevel: string[];
  shift: string[];
  instituteContacts: InstituteContacts;
  subdomain: string;
  domain?: string;
  basicInfo: BasicInfo;
  frontendTheme?: string; 
  themeColors?: ThemeColors;
}