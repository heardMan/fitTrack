/**
 * @name App.js
 * @author Mark Heard
 * @version 1.0
 * @copyright 2021
 * @application The main Application UI and Routing logic is 
 * determined by this file and it's descendents
 */

//Import react library with useState hook for testing purposes.
import React, { useState, Fragment } from 'react';

import { BrowserRouter as Router, Route, Switch, useParams } from "react-router-dom";
//import { createBrowserHistory } from 'history';
import { useAuth0 } from "@auth0/auth0-react";

import ProtectedRoute from "./components/ProtectedRoute.js";

import Loading from "./components/Loading.js";
import Header from "./components/Header.js";
import Nav from "./components/Nav.js";
import Footer from "./components/Footer.js";
import ExerciseCard from "./components/ExerciseCard.js";

import About from "./views/About.js";
import Contact from "./views/Contact.js";
import Exercises from "./views/Exercises.js";
import Home from "./views/Home.js";
import Menu from "./views/Menu.js";
import Settings from "./views/Settings.js";
import UserWorkouts from "./views/UserWorkouts.js";
import Workouts from "./views/Workouts.js";
import ExerciseForm from "./views/ExerciseForm.js";
import WorkoutForm from "./views/WorkoutForm.js";

import './App.css';

//export const history = createBrowserHistory();

function App() {

  const { isLoading, error } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router >
      <div id='app-container' className='dark'>
        <Header />
        <Nav />
        <main>
          <Switch>
            {/* Public Routes */}
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            {/* Protected Routes */}
            <ProtectedRoute path="/menu" component={Menu} />

            <ProtectedRoute path="/exercises" exact component={Exercises} />
            <ProtectedRoute path="/newexercise" component={ExerciseForm} />
            <ProtectedRoute path="/exercises/:id" component={ExerciseForm} />

            <ProtectedRoute path="/workouts" component={Workouts} />
            <ProtectedRoute path="/newworkout" component={WorkoutForm} />
            <ProtectedRoute path="/workouts/:id" component={WorkoutForm} />

            <ProtectedRoute path="/userworkouts" component={UserWorkouts} />

            <ProtectedRoute path="/settings" component={Settings} />
            
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>

  );
}

export default App;
