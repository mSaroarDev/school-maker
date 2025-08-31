import { TLoginResponse } from "@/api/institute/institue.interfaces";

export interface AuthState {
  user: TLoginResponse["data"]["user"] | null;
  avatar?: string;
  loading: boolean;
};

export interface LoginCredentials {
  email: string;
  password: string;
};

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<TLoginResponse>;
  logout: () => void;
  isLoginLoading: boolean;
  dispatch: React.Dispatch<React.ReducerAction<typeof authReducer>>;
  isValidToken: () => Promise<boolean | undefined>;
  isAdmin: boolean;
  isModerator: boolean;
  isUser: boolean;
};

export interface IGoogleLogin {
  accessToken: string;
  loginType: string;
};

export interface IResponse {
  data: {
    success: boolean;
    message: string;
    data: AuthState["user"];
  };
};
