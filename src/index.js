import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider, AppState } from "@auth0/auth0-react";
import reportWebVitals from './reportWebVitals';

//the follow
//import { BrowserRouter as Router } from "react-router-dom";
//import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
// ReactDOM.render(
//   <Router>
//     <Auth0ProviderWithHistory>
//       <React.StrictMode>
//         <App />
//       </React.StrictMode>
//     </Auth0ProviderWithHistory>
//   </Router>,
//   document.getElementById('root')
// );

  ReactDOM.render(
    <React.StrictMode>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        redirectUri={window.location.origin}
        //audience={process.env.REACT_APP_AUDIENCE}
        //scope="read:users"
        //onRedirectCallback={onRedirectCallback}
      >
        <App />
      </Auth0Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
