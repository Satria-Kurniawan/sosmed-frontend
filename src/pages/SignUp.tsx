import React from "react";
import { Link } from "react-router-dom";
import { useMultistepForm } from "../hooks/useMultistepForm";
import { CredentialsSignUpType } from "../types";
import { useAuth } from "../hooks/useAuth";

import { BrandIcon, CloseIcon, GoogleIcon } from "../assets/icons";
import IconButton from "../components/IconButton";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import Spinner from "../components/Spinner";

export default function SignUp() {
  const [values, setValues] = React.useState<Partial<CredentialsSignUpType>>({
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirmation: "",
  });
  const [showError, setShowError] = React.useState<boolean>(false);

  const updateValues = (newValues: Partial<CredentialsSignUpType>) => {
    setValues((values) => {
      return { ...values, ...newValues };
    });
  };

  const { signUp, loading, error } = useAuth();

  const { currentStep, firstStep, lastStep, nextStep, backStep } =
    useMultistepForm([
      <FirstStep />,
      <SecondStep {...values} updateValues={updateValues} />,
      <ThirdStep {...values} updateValues={updateValues} loading={loading} />,
    ]);

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!lastStep) return nextStep();
    signUp(values);
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
      <section className="fixed left-1/2 top-1/2 z-50 h-fit w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-5 md:h-[90vh] md:w-[40vw]">
        <div className="relative h-full">
          <Link to={"/explore"}>
            <IconButton icon={<CloseIcon size={15} />} />
          </Link>
          <form
            onSubmit={handleSignUp}
            className="mx-auto flex flex-col items-center justify-center gap-y-5 md:w-[65%]"
          >
            <BrandIcon size={40} color="#D000FF" />
            {currentStep}
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

const FirstStep = () => {
  return (
    <>
      <h1 className="my-3 text-center text-2xl font-bold md:text-3xl">
        Join Vibegram today
      </h1>
      <Button
        type="button"
        variant="outline-secondary"
        text="Sign Up with Google"
        icon={<GoogleIcon size={20} />}
        iconPosition="left"
        className="w-full"
      />
      <div className="flex w-full items-center gap-x-3">
        <hr className="w-full" />
        <span>or</span>
        <hr className="w-full" />
      </div>
      <Button
        type="submit"
        variant="secondary"
        text={"Create account"}
        className="w-full"
      />
      <div className="mt-3 self-start">
        <span>Have an account already? </span>
        <span className="text-primary">
          <Link to="/accounts/signin">Log in</Link>
        </span>
      </div>
    </>
  );
};

type SecondStepType = {
  name?: string;
  email?: string;
  phone?: string;
  updateValues: (newValues: Partial<CredentialsSignUpType>) => void;
};

const SecondStep = ({ name, email, phone, updateValues }: SecondStepType) => {
  const [byPhone, setByPhone] = React.useState<boolean>(false);

  return (
    <>
      <h1 className="my-3 text-center text-2xl font-bold md:text-3xl">
        Create your account.
      </h1>
      <TextInput
        label="Name"
        type="text"
        placeholder="Name"
        onChange={(e) => updateValues({ name: e.target.value })}
        value={name}
        required
      />
      {!byPhone ? (
        <TextInput
          label="Email"
          type="email"
          placeholder="Email"
          onChange={(e) => updateValues({ email: e.target.value })}
          value={email}
          required
        />
      ) : (
        <TextInput
          label="Phone"
          type="text"
          placeholder="Phone"
          onChange={(e) => updateValues({ phone: e.target.value })}
          value={phone}
          pattern="^((0\d{11})|(62\d{11,}))$"
          errorMessage="Please enter a valid phone number."
          required
        />
      )}
      <span
        className="cursor-pointer self-end text-primary hover:underline"
        onClick={() => {
          setByPhone((byPhone) => !byPhone);
          if (!byPhone) return updateValues({ phone: "" });
          updateValues({ email: "" });
        }}
      >
        {byPhone ? "Use email instead" : "Use phone instead"}
      </span>
      <Button
        type="submit"
        variant="secondary"
        text={"Next"}
        className="w-full"
      />
    </>
  );
};

type ThirdStepType = {
  password?: string;
  passwordConfirmation?: string;
  updateValues: (newValues: Partial<CredentialsSignUpType>) => void;
  loading: boolean;
};

const ThirdStep = ({
  password,
  passwordConfirmation,
  updateValues,
  loading,
}: ThirdStepType) => {
  return (
    <>
      <h1 className="my-3 text-center text-2xl font-bold md:text-3xl">
        Create your password.
      </h1>
      <TextInput
        label="Password"
        type="password"
        placeholder="Password"
        onChange={(e) => updateValues({ password: e.target.value })}
        value={password}
        required
      />
      <TextInput
        label="Password confirmation"
        type="password"
        placeholder="Password confirmation"
        onChange={(e) => updateValues({ passwordConfirmation: e.target.value })}
        value={passwordConfirmation}
        required
      />
      {loading ? (
        <Spinner />
      ) : (
        <Button
          type="submit"
          variant="secondary"
          text={"Sign Up"}
          className="w-full"
        />
      )}
    </>
  );
};
