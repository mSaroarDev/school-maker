
export type TLoginPayload = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  success: boolean;
  message: string;
  data: {
    token: string;
    data: {
      _id: string;
      fullName: string;
      email: string;
      phone: string;
      role: string;
      profile: {
        gender?: string;
        dateOfBirth?: Date;
        bloodGroup?: string;
        religion?: string;
        nid?: string;
        fatherName?: string;
        motherName?: string;
        address?: string;
        zipCode?: string;
        city?: string;
        country?: string;
        bio?: string;
      };
      avatar?: string;
      createdAt: Date;
      updatedAt: Date;
    }
  }
};

export type TUpdateUserPayload = {
  fullName: string;
  email: string;
  phone: string;
  profile: {
    gender: string;
    dateOfBirth: Date | null;
    bloodGroup: string;
    religion: string;
    nid: string;
    fatherName: string;
    motherName: string;
    address: string;
    zipCode: string;
    city: string;
    country: string;
    bio: string;
  };
  avatar?: string;
}