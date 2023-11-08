import React from "react";
import ReactDOM from "react-dom/client";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";
import App from "./App.tsx";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
