/**
 * @name Nav.js
 * @author Mark Heard
 * @version 1.0
 * @copyright 2021
 * @component A simple navigation comoponent used to display a title logo
 */

//Import react library with useState hook and Fragment.
import React, { useState, Fragment } from 'react';

import { Link } from "react-router-dom";

//Import menu icon to display on nav toggle when closed
import menuIcon from "../menu-white-18dp.svg";
//Import menu icon to display on nav toggle when closed
import closeIcon from "../close-white-18dp.svg";

const Nav = () => {

    const [display, setDisply] = useState(false)

    const toggle = () => {
        if(display===false){
            return setDisply(true);
        }
        return setDisply(false);
    }

    return (

        //A nav tag is returned as the parent element to keep HTML semantic.

        <nav>
            {
                //A ternary operator is used to read the display status of the
                //disply property to return the appropriate HTML

                display?
                //if display is true return
                //a menu with set of links
                //a button that displays the close icon
                //using the short hand React fragment notation
                <>
                    <button id='nav-toggle' onClick={toggle}>
                        <img id='nav-status-icon' src={closeIcon} alt='close menu icon'/>
                    </button>

                    <div id='nav-menu' className='open'>

                    <div><Link to="/">Home</Link></div>
                    <div><Link to="/contact">Contact</Link></div>
                    <div><Link to="/about">About</Link></div>
                    <div><Link to="/contact">Contact</Link></div>
                    <div><Link to="/exercises">Exercises</Link></div>
                    <div><Link to="/menu">Menu</Link></div>
                    <div><Link to="/settings">Settings</Link></div>
                    <div><Link to="/userworkouts">User Workouts</Link></div>
                    <div><Link to="/workouts">Workouts</Link></div>

                    </div>
                </>
                :
                //if display is false return a button that displays the menu icon
                <>
                    <button id='nav-toggle' onClick={toggle}>
                        <img id='nav-status-icon' src={menuIcon} alt='hamburger menu icon'/>
                    </button>
                    <div id='nav-menu' className='close'>

                    <div><Link to="/">Home</Link></div>
                    <div><Link to="/contact">Contact</Link></div>
                    <div><Link to="/about">About</Link></div>
                    <div><Link to="/contact">Contact</Link></div>
                    <div><Link to="/exercises">Exercises</Link></div>
                    <div><Link to="/menu">Menu</Link></div>
                    <div><Link to="/settings">Settings</Link></div>
                    <div><Link to="/userworkouts">User Workouts</Link></div>
                    <div><Link to="/workouts">Workouts</Link></div>

                    </div>
                </>
                
            }

        </nav>

    );

}

//ES6 export statement.
export default Nav;