// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AccountProvider from "./context/AccountProvider.tsx";
import './index.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId="627613218869-bphfdpo1lla9kmuam69dm6pt5cg7sd6n.apps.googleusercontent.com">
    <AccountProvider>
      <App />
    </AccountProvider>
  </GoogleOAuthProvider>,
  // </React.StrictMode>,
);
