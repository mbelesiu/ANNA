import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { Domain, Id } from './configs/authoConfig.js'
import { Auth0Provider } from "@auth0/auth0-react";


ReactDOM.render(
  <Auth0Provider
    domain={Domain}
    clientId={Id}
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('app'));
