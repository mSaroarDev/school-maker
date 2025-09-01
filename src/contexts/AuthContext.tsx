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

// Use the user type from TLoginResponse for full type safety
type User = TLoginResponse["data"]["data"];

const initialState = {
  user: {
    _id: "",
    fullName: "",
    email: "",
    phone: "",
    role: "",
    isOnline: false,
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
      bio: "",
    },
    updatedAt: new Date(),
    createdAt: new Date(),
  } as User,
  avatar: "",
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
      console.log("loggin", action.payload);
      return {
        user: action.payload,
        loading: false
      };
    case "LOGOUT":
      return { user: null, avatar: "", loading: false };
    case "STOP_LOADING":
      return { ...state, loading: false };
    case "SET_USER":
      console.log("SET_USER action payload:", action.payload);
      return {
        ...state,
        user: action.payload,
        loading: false
      };
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
      dispatch({ type: "LOGIN", payload: res.data.data });
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
        const response = await request.get("/users/me");
        console.log("User info fetched successfully:", response);
        if (response?.data?.success) {
          if (!response?.data) {
            return;
          };

          console.log("Authenticated user data:", response.data?.data);

          dispatch({ type: "LOGIN", payload: response?.data?.data });
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
  }, [token, replace]);

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
