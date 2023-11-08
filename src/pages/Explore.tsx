import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFetch } from "../hooks/useFetch";

import { GoogleIcon } from "../assets/icons";
import Button from "../components/Button";
import Header from "../components/Header";
import Tweet from "../components/Tweet";

import { TweetType } from "../types";

export default function Explore() {
  const { state } = useAuthContext();
  const { data, loading } = useFetch<{ tweets: TweetType[] }>("api/tweet/all");

  return (
    <main className="flex min-h-screen">
      <section className="w-full border-x md:w-[60%]">
        <Header title="Explore" />
        <article>
          {data?.tweets.map((tweet) => {
            return <Tweet key={tweet._id} tweet={tweet} />;
          })}
        </article>
      </section>
      <section className="hidden w-[40%] md:block">
        <div className="sticky top-0 px-5 py-3">
          <div className="rounded-xl border p-5">
            <h1 className="mb-1 text-xl font-bold">New to Vibegram</h1>
            <p className="mb-3 text-sm">
              Sign up now to get your own personalized timeline!
            </p>

            <Button
              variant="outline-secondary"
              text="Sign up with Google"
              icon={<GoogleIcon size={20} />}
              iconPosition="left"
              className="mb-3 w-full"
            />
            <Link to="/accounts/signup">
              <Button
                variant="outline-secondary"
                text="Create account"
                className="w-full"
              />
            </Link>
            <p className="mt-3 text-sm">
              By signing up, you agree to the{" "}
              <span className="cursor-pointer text-primary hover:underline">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="cursor-pointer text-primary hover:underline">
                Privacy Policy
              </span>
              , including{" "}
              <span className="cursor-pointer text-primary hover:underline">
                Cookie Use.
              </span>
            </p>
          </div>
        </div>
      </section>
      {!state?.authenticated && (
        <section className="fixed bottom-0 left-0 z-[50] flex w-full flex-col items-center justify-between gap-3 bg-primary px-8 py-2 text-white md:flex-row md:px-16">
          <div className="w-full text-center md:text-start">
            <h1 className="text-xl font-bold md:text-2xl">
              Don’t miss what’s happening{" "}
            </h1>
            <p className="text-sm md:text-base">
              People on Vibegram are the first to know.
            </p>
          </div>
          <div className="mt-3 flex w-full justify-center gap-x-3 md:justify-end">
            <Link to="/accounts/signin">
              <Button
                variant="outline-secondary"
                text="Login"
                className="text-white"
              />
            </Link>
            <Link to="/accounts/signup">
              <Button variant="secondary" text="Sign Up" />
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
