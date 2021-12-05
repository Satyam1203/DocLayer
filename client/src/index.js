import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { domain, clientId } from "./config";

// Hide internal package error for react-draft-wysiwyg
console.error = () => {};

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
