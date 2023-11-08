import React from "react";
import { UserType } from "../types";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

type StateType = {
  user: UserType | null;
  accessToken: string;
  authenticated: boolean;
};

type ActionType =
  | { type: "LOGIN"; payload: { user: UserType; accessToken: string } }
  | { type: "LOGOUT"; payload?: { user: UserType; accessToken: string } };

type AuthContextType = {
  state?: StateType;
  dispatch: React.Dispatch<ActionType>;
};

type Props = {
  children: React.ReactNode;
};

export const AuthContext = React.createContext<AuthContextType>({
  state: { user: null, accessToken: "", authenticated: false },
  dispatch: () => undefined,
});

const authReducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        authenticated: true,
      };
    case "LOGOUT":
      return {
        user: null,
        accessToken: "",
        authenticated: false,
      };
    default:
      return state;
  }
};

const encryptedSession = Cookies.get("session");
const secretKey = import.meta.env.VITE_SESSION_SECRET_KEY;

const bytes =
  encryptedSession && CryptoJS.AES.decrypt(encryptedSession, secretKey);
const originalText = bytes?.toString(CryptoJS.enc.Utf8);
const session: StateType = originalText && JSON.parse(originalText);

const initialState: StateType = {
  user: session?.user || null,
  accessToken: session?.accessToken || "",
  authenticated: session?.accessToken ? true : false,
};

export const AuthContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
