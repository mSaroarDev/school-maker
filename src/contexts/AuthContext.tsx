"use client";
import { createContext, useEffect, useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { AuthContextType, AuthState, LoginCredentials } from "@/types/auth";
import { TLoginResponse } from "@/api/user/user.interfaces";
import request from "@/api/apiRequest";
import { useUserLogin } from "@/api/user/user.hooks";

interface ChildrenProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type User = AuthState["user"];

const initialState: AuthState = {
  user: {
    _id: "",
    fullName: "",
    email: "",
    phone: "",
    role: "",
    profile: {
      gender: "",
      dateOfBirth: new Date(),
      bloodGroup: "",
      religion: "",
      nid: "",
      fatherName: "",
      motherName: "",
      address: "",
      zipCode: "",
      city: "",
      country: "",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  } as User,
  loading: true,
};

type Action =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "STOP_LOADING" }
  | { type: "SET_USER"; payload: User };

function authReducer(state: AuthState, action: Action): AuthState {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload, loading: false };
    case "LOGOUT":
      return { user: null, loading: false };
    case "STOP_LOADING":
      return { ...state, loading: false };
    case "SET_USER":
      return { ...state, user: action.payload, loading: false };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }: ChildrenProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { mutateAsync: userLogin, isPending: isLoginLoading } = useUserLogin();
  const [token, setToken] = useState<string | null>(null);

  const { replace } = useRouter();

  // Initialize token state on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  const handleSuccessLogin = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token); // Update token state

    Cookies.set("token", token);
  }

  const login = async ({ email, password }: LoginCredentials): Promise<TLoginResponse> => {
    const res = await userLogin({ email, password });
    if (!res.success) {
      throw new Error(res.message || "Login failed");
    }

    if (res?.success) {
      handleSuccessLogin(res.data.token);
      dispatch({ type: "LOGIN", payload: res.data.user });
    }
    return res;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("persist:root");
    setToken(null);
    Cookies.remove("token");
    dispatch({ type: "LOGOUT" });
  };

  const isValidToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const response: TLoginResponse = await request.get("/users/me");
      if (response?.success) {
        return true;
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      return false;
    }
  };

  const isAdmin = state.user?.role === "Software Engineer" || state.user?.role === "Developer" || state.user?.role === "Super Admin";

  useEffect(() => {
    if (!token) {
      dispatch({ type: "STOP_LOADING" });
      return;
    }

    const getUserInfo = async () => {
      try {
        const response: TLoginResponse = await request.get("/users/me");
        if (response?.success) {
          if (!response?.data) {
            return;
          };

          dispatch({ type: "LOGIN", payload: response?.data });
        } else {
          dispatch({ type: "LOGOUT" });
          return replace(`/login`);
        }
      } catch (error) {
        console.error(error);
        dispatch({ type: "LOGOUT" });
      }
    };

    getUserInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replace]);

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    isLoginLoading,
    dispatch,
    isValidToken,
    isAdmin,
    isModerator: state.user?.role === "Moderator",
    isUser: state.user?.role === "User",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
