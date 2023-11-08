import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Layout from "./layouts/Layout";
import PrivateRoutes from "./utils/PrivateRoutes";
import AuthRoutes from "./utils/AuthRoutes";
import Home from "./pages/Home";
import Notifications from "./pages/Notifications";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Splash from "./components/Splash";
import SignUp from "./pages/SignUp";
import SendVerification from "./pages/SendVerification";
import Verify from "./pages/Verify";

export default function App() {
  const [splash, setSplash] = React.useState<boolean>(true);
  const { state } = useAuthContext();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Explore /> },
        { path: "explore", element: <Explore /> },
        {
          path: "accounts",
          element: <AuthRoutes />,
          children: [
            { path: "signin", element: <Login /> },
            { path: "signup", element: <SignUp /> },
          ],
        },
        {
          element: <PrivateRoutes />,
          children: [
            { path: "home", element: <Home /> },
            { path: "notifications", element: <Notifications /> },
            { path: "messages", element: <Messages /> },
            { path: "profile", element: <Profile /> },
          ],
        },
      ],
    },
    { path: "/accounts/verify", element: <Verify /> },
    { path: "/accounts/sendverification", element: <SendVerification /> },
  ]);

  React.useEffect(() => {
    setSplash(true);
    setTimeout(() => {
      setSplash(false);
    }, 2000);
  }, [state?.authenticated]);

  if (splash) return <Splash />;

  return <RouterProvider router={router} />;
}
