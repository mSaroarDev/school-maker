export type TInstitute = {
  name: string;
  instituteType: string;
  stablishedYear: number;
  eiin?: string;
  address: string;
  district: string;
  zip: string;
  religion: string;
  mpoType?: string;
  educationLevel: string[];
  shift: string[];
  instituteContacts: {
    contactNo: string;
    whatsApp?: string;
    email?: string;
    website?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
  };
  subdomain?: string;
  domain?: string;
  basicInfo?: {
    logo?: string;
    bannerImages?: string[];
    about?: string;
    briefDescription?: string;
    mission?: string;
    vision?: string;
  },
  frontendTheme?: string;
  themeColors?: {
    primary?: string;
    forground?: string;
  };
  status: string;
  isDeleted: boolean;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}