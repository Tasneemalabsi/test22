import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { withAuth0 } from '@auth0/auth0-react';

ReactDOM.render(
  <Auth0Provider
    domain='dev-dnmlmljy.us.auth0.com'
    clientId='g7AEIcvulUVvkzjBRfpn7z8sgRHR9l5d'
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);