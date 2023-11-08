import React from "react";
import { Link } from "react-router-dom";
import { useMultistepForm } from "../hooks/useMultistepForm";
import { useAuth } from "../hooks/useAuth";
import { CredentialsType } from "../types";
import { useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";

import { BrandIcon, CloseIcon, EyeIcon, GoogleIcon } from "../assets/icons";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import IconButton from "../components/IconButton";
import Spinner from "../components/Spinner";

export default function Login() {
  const [credentials, setCredentials] = React.useState<CredentialsType>({
    account: "",
    password: "",
  });
  const [showError, setShowError] = React.useState<boolean>(false);

  const updateCredentials = (credentials: Partial<CredentialsType>) => {
    setCredentials((current) => {
      return { ...current, ...credentials };
    });
  };

  const { currentStep, firstStep, nextStep, backStep } = useMultistepForm([
    <AccountStep {...credentials} updateCredentials={updateCredentials} />,
    <PasswordStep {...credentials} updateCredentials={updateCredentials} />,
  ]);

  const { signIn, loading, error } = useAuth();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (firstStep) return nextStep();

    signIn(credentials);
  };

  React.useEffect(() => {
    if (!error) return;
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 3000);
  }, [error]);

  return (
    <main>
      <div className="fixed inset-0 z-50 bg-black/20" />
      <section className="fixed left-1/2 top-1/2 z-50 h-fit w-[90vw] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-5 md:h-[90vh] md:w-[40vw]">
        <div className="relative h-full">
          <Link to={"/explore"}>
            <IconButton icon={<CloseIcon size={15} />} />
          </Link>
          <form
            onSubmit={handleLogin}
            className="mx-auto flex flex-col items-center justify-center gap-y-5 md:w-[65%]"
          >
            <BrandIcon size={40} color="#D000FF" />
            {currentStep}
            {loading ? (
              <Spinner />
            ) : (
              <>
                <Button
                  type="submit"
                  variant="secondary"
                  text={firstStep ? "Next" : "Login"}
                  className="w-full"
                />
                <Button
                  type="button"
                  variant="outline-secondary"
                  text="Forgot Password"
                  className="w-full font-semibold"
                />
              </>
            )}
            <div className="mt-3 self-start">
              <span>Don't have an account? </span>
              <span className="text-primary">
                <Link to="/accounts/signup">Sign up</Link>
              </span>
            </div>
          </form>
          {!firstStep && (
            <div
              className="absolute bottom-3 left-3 cursor-pointer"
              onClick={backStep}
            >
              Back
            </div>
          )}
        </div>
        {showError && error && (
          <div className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 rounded-t-sm bg-primary p-4 text-center font-medium text-white">
            {error}
          </div>
        )}
      </section>
    </main>
  );
}

type AccountStepPropsType = {
  account: string;
  updateCredentials: (credentials: Partial<CredentialsType>) => void;
};

const AccountStep = ({ account, updateCredentials }: AccountStepPropsType) => {
  const { signInWithGoogle } = useAuth();

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      signInWithGoogle(tokenResponse.access_token);
      console.log(tokenResponse.access_token);
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      credentialResponse.credential &&
        signInWithGoogle(credentialResponse.credential);
      console.log(credentialResponse.credential);
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  return (
    <>
      <h1 className="my-3 text-center text-2xl font-bold md:text-3xl">
        Sign in to Vibegram
      </h1>
      <Button
        type="button"
        variant="outline-secondary"
        text="Sign in with Google"
        icon={<GoogleIcon size={20} />}
        iconPosition="left"
        className="w-full"
        onClick={() => handleGoogleSignIn()}
      />
      <div className="flex w-full items-center gap-x-3">
        <hr className="w-full" />
        <span>or</span>
        <hr className="w-full" />
      </div>
      <TextInput
        label="Phone, email, or username"
        type="text"
        placeholder="Phone, email, or username"
        onChange={(e) => updateCredentials({ account: e.target.value })}
        value={account}
        required
      />
    </>
  );
};

type PasswordStepType = {
  password: string;
  updateCredentials: (credentials: Partial<CredentialsType>) => void;
};

const PasswordStep = ({ password, updateCredentials }: PasswordStepType) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  return (
    <>
      <h1 className="my-3 text-center text-2xl font-bold md:text-3xl">
        Enter your password
      </h1>
      <TextInput
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        icon={
          <IconButton
            icon={
              <EyeIcon size={20} color={showPassword ? "#D000FF" : "#000"} />
            }
          />
        }
        onIconClick={() => setShowPassword((show) => !show)}
        onChange={(e) => updateCredentials({ password: e.target.value })}
        value={password}
        required
      />
    </>
  );
};
