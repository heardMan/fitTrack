/**
 * @name App.js
 * @author Mark Heard
 * @version 1.0
 * @copyright 2021
 * @application The main Application logic and architecture is 
 * determined by this file and it's descendents
 * 
 */

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header.js";
import Nav from "./components/Nav.js";
import Home from "./views/Home.js";
import './App.css';
import { useAuth0 } from "@auth0/auth0-react";

//Import react library with useState hook for testing purposes.
import React, { useState, Fragment } from 'react';

//import the SignIn component to render in the case that requester is not logged in
import SignIn from "./components/SignIn.js";

//import the SignUp component to render in the case that requester is not logged in
import SignUp from "./components/SignUp.js";

//import the SignIn component to render in the case that requester is not logged in
import Register from "./components/Register.js";

function App() {

  const { isAuthenticated, loginWithRedirect } = useAuth0();

  //temporary state variables used to mimic authentication protocols
  const [signedIn, setSignedIn] = useState(false);

  return (
    <Router>
      {
        /**
         * DARK/LIGHT THEME CONTROLLED BY CLASSNAMES: 'light' & 'dark'
         */
      }
      <div id='app' className='dark'>
        <Header />
        <Nav />
        <main>
          {
            //if the visitor is SIGNED IN render any of the following
            //components upon request
          }
          <Switch>
            <Route path="/" exact render={()=><div>home</div>} />
            <Route path="/about" exact render={()=><div>about</div>} />
            <Route path="/" exact render={()=><div>contact</div>} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
