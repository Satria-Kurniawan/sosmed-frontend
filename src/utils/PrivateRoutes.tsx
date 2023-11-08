import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function PrivateRoutes(): JSX.Element {
  const { state } = useAuthContext();

  if (!state?.authenticated) return <Navigate to="/accounts/signin" />;

  return <Outlet />;
}
