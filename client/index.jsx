import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { Auth0Provider } from "@auth0/auth0-react";


ReactDOM.render(
  <Auth0Provider
    domain="mbelesiu.us.auth0.com"
    clientId="4s5HpOBiWb4tm5R8d3bVwRDumbmj0z1O"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('app'));
