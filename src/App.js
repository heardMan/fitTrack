import Header from "./components/Header.js";
import Nav from "./components/Nav.js";
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
    <div id='app' className='dark'>
      <Header/>
      <Nav/>
    </div>
  );
}

export default App;
