/**
 * @name Nav.js
 * @author Mark Heard
 * @version 1.0
 * @copyright 2021
 * @component A simple navigation comoponent used to display a title logo
 */

//Import react library with useEffect and useState hooks.
import React, { useState, Fragment } from 'react';

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
                        <img id='nav-status-icon' src={closeIcon} alt='hamburger menu icon'/>
                    </button>
                    <div id='nav-menu'>
                    <div>Home</div>
                    <div>Contact</div>
                    <div>About</div>
                    </div>
                </>
                :
                //if display is false return a button that displays the menu icon
                <>
                    <button id='nav-toggle' onClick={toggle}>
                        <img id='nav-status-icon' src={menuIcon} alt='hamburger menu icon'/>
                    </button>
                </>
                
            }

        </nav>

    );

}

//ES6 export statement.
export default Nav;