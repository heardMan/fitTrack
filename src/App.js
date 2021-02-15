import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Header from "./components/Header.js";
import Nav from "./components/Nav.js";
import Home from "./views/Home.js";
import SignIn from "./views/SignIn.js";
import './App.css';

/**
 * @name App.js
 * @author Mark Heard
 * @version 1.0
 * @copyright 2021
 * @application The main Application logic and architecture is 
 * determined by this file and it's descendents
 * 
 */

function App() {
  return (
    <Router>
      <div id='app' className='dark'>
        <Header />
        <Nav />
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signin" component={SignIn} />
            <Route render={() => <Home/>} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
