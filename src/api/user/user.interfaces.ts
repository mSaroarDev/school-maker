
export type TLoginPayload = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
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
      };
      avatar?: string;
      createdAt: Date;
      updatedAt: Date;
    }
  }
}