import React from "react";
import { useAuthContext } from "./useAuthContext";
import { CredentialsType, UserType, CredentialsSignUpType } from "../types";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

type SessionType = {
  user: UserType;
  accessToken: string;
};

export function useAuth() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const secretKey = import.meta.env.VITE_SESSION_SECRET_KEY;

  const signIn = async (fields: CredentialsType) => {
    setLoading(true);
    setError(null);

    const { account, password } = fields;

    const isNumber = !isNaN(parseInt(account));

    let credentials;

    if (isNumber) {
      credentials = { phone: account, password };
    } else {
      credentials = { email: account, password };
    }

    const response = await fetch(`${BACKEND_URL}/api/user/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    } else {
      const session: SessionType = {
        user: json.data.user,
        accessToken: json.data.accessToken,
      };

      const encryptedSession: string = CryptoJS.AES.encrypt(
        JSON.stringify(session),
        secretKey
      ).toString();

      Cookies.set("session", encryptedSession, { secure: true, expires: 1 });

      dispatch({ type: "LOGIN", payload: session });

      setLoading(false);
      setError(null);
    }
  };

  const signOut = () => {
    Cookies.remove("session");
    dispatch({ type: "LOGOUT" });
    googleLogout();
  };

  const signUp = async (fields: Partial<CredentialsSignUpType>) => {
    setLoading(true);
    setError(null);

    const response = await fetch(`${BACKEND_URL}/api/user/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });
    const json = await response.json();

    if (response.status === 302)
      return navigate(`/accounts/sendverification?email=${fields.email}`);

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    } else {
      setLoading(false);
      setError(null);
      if (json.data) {
        navigate(`/accounts/sendverification?email=${fields.email}`);
      } else {
        navigate("/accounts/signin");
      }
    }
  };

  const signInWithGoogle = async (googleAccessToken: string) => {
    setLoading(true);
    setError(null);

    const response = await fetch(`${BACKEND_URL}/api/user/google-sign-in`, {
      method: "POST",
      headers: { Authorization: `Bearer ${googleAccessToken}` },
    });

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    } else {
      const session: SessionType = {
        user: json.data.user,
        accessToken: json.data.accessToken,
      };

      const encryptedSession: string = CryptoJS.AES.encrypt(
        JSON.stringify(session),
        secretKey
      ).toString();

      Cookies.set("session", encryptedSession, { secure: true, expires: 1 });

      dispatch({ type: "LOGIN", payload: session });

      setLoading(false);
      setError(null);
    }
  };

  return { signIn, signOut, signUp, loading, error, signInWithGoogle };
}
