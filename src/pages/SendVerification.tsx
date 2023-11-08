import { Link, useSearchParams } from "react-router-dom";

export default function SendVerification() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  return (
    <main className="flex h-screen items-center justify-center bg-primary">
      <div className="w-[30%] rounded-xl bg-white p-5 text-center">
        <h1 className="mb-3 text-xl font-bold">Cek email anda</h1>
        <p className="mb-3">
          Email verifikasi telah dikirim ke{" "}
          <span className="text-primary">
            <Link to="https://mail.google.com/mail/u/0/" target="_blank">
              {email}
            </Link>
          </span>
        </p>
      </div>
    </main>
  );
}
