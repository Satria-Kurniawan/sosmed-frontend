import React from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Cookies from "js-cookie";
import { UserType } from "../types";

import Button from "../components/Button";
import { VerifiedIcon } from "../assets/icons";
import Spinner from "../components/Spinner";

type VerificationTokenType = {
  verificationToken: {
    token: string;
    expiresAt: string;
    user: UserType;
  };
};

export default function Verify() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token") || Cookies.get("verificationToken");
  const [tokenExpired, setTokenExpired] = React.useState<boolean>(false);
  const [redirectCountdown, setRedirectCountdown] = React.useState<number>(10);
  const navigate = useNavigate();
  const [verifyLoading, setVerifyLoading] = React.useState<boolean>(false);
  const [verified, setVerified] = React.useState<boolean>(false);

  const { data } = useFetch<VerificationTokenType>(
    `api/user/verification-token?token=${token}`
  );

  const expiresAt = data?.verificationToken.expiresAt || "";
  const expired = expiresAt !== "" && new Date(expiresAt) < new Date();

  React.useEffect(() => {
    if (token) {
      const cookieExpiresAt = new Date(expiresAt);
      Cookies.set("verificationToken", token, { expires: cookieExpiresAt });
    }
  }, [expiresAt, token]);

  React.useEffect(() => {
    if (redirectCountdown <= 0) return;

    let redirectInterval: number;

    if (expired) {
      setTokenExpired(true);
      redirectInterval = setInterval(() => {
        setRedirectCountdown((countdown) => countdown - 1);
      }, 1000);
    } else {
      setTokenExpired(false);
    }

    return () => clearInterval(redirectInterval);
  }, [expiresAt, expired, redirectCountdown]);

  React.useEffect(() => {
    if (redirectCountdown === 0) {
      if (verified) navigate("/accounts/signin");
      else navigate("/");
    }
  }, [navigate, verified, redirectCountdown]);

  React.useEffect(() => {
    if (redirectCountdown <= 0) return;

    let redirectInterval: number;

    if (verified) {
      redirectInterval = setInterval(() => {
        setRedirectCountdown((countdown) => countdown - 1);
      }, 1000);
    }

    return () => clearInterval(redirectInterval);
  }, [verified, redirectCountdown]);

  const handleVerify = async () => {
    setVerifyLoading(true);

    const response = await fetch(`api/user/verify-email?token=${token}`);

    if (!response.ok) {
      setVerified(false);
      setVerifyLoading(false);
    } else {
      setVerified(true);
      setVerifyLoading(false);
    }
  };

  const { data: userData } = useFetch<{ user: UserType }>(
    `api/user/by-email?email=${email}`
  );

  if (tokenExpired)
    return (
      <div className="flex h-screen items-center justify-center bg-primary">
        <div className="w-[30%] rounded-xl bg-white p-5">
          <h1 className="mb-3 text-center text-xl font-bold">
            Verification token expired!
          </h1>
          <p className="mb-3">
            Token sudah kadaluarsa, silahkan melakukan{" "}
            <span className="cursor-pointer text-primary">
              <Link to="/accounts/signup">pendafaran akun</Link>
            </span>{" "}
            ulang.
          </p>
          <h6>Anda akan dialihkan dalam {redirectCountdown} detik</h6>
        </div>
      </div>
    );

  return (
    <main className="flex h-screen items-center justify-center bg-primary">
      <div className="w-[30%] rounded-xl bg-white p-5 text-center">
        {!verified && !userData?.user.accountActive ? (
          <>
            <h1 className="mb-3 text-xl font-bold">Verifikasi Akun</h1>
            <p className="mb-3">
              Tekan tombol verify account dibawah untuk mengaktifkan{" "}
              <span className="text-primary">
                {data?.verificationToken.user.email}
              </span>
            </p>
            {verifyLoading ? (
              <Spinner />
            ) : (
              <Button
                variant="secondary"
                text="Verify Account"
                className="mx-auto"
                onClick={handleVerify}
              />
            )}
          </>
        ) : (
          <>
            <div className="mb-3 flex items-center justify-center gap-x-3 text-xl font-bold">
              <span>Akun berhasil diverifikasi</span>
              <span>
                <VerifiedIcon size={30} color="#00D366" />
              </span>
            </div>
            <p className="mb-3">
              Selamat, akun Vibegram anda telah diaktifkan, silahkan melakukan{" "}
              <span className="text-primary">
                <Link to="/accounts/signin">log in</Link>
              </span>{" "}
              untuk berselancar.
            </p>
            {!userData?.user.accountActive && (
              <h6>Anda akan dialihkan dalam {redirectCountdown} detik</h6>
            )}
          </>
        )}
      </div>
    </main>
  );
}
