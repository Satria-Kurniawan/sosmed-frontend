import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Explore from "../pages/Explore";

export default function AuthRoutes(): JSX.Element {
  const { state } = useAuthContext();

  if (state?.authenticated) return <Navigate to="/home" />;

  return (
    <>
      <Explore />
      <Outlet />;
    </>
  );
}
