/**
 * @name Nav.js
 * @author Mark Heard
 * @version 1.0
 * @copyright 2021
 * @component A simple navigation comoponent used to display a title logo
 */

 import menuIcon from "../menu-white-18dp.svg";

const Nav = () => {

    return (

        // a nav tag is returned as the parent element to keep HTML semantic

        <nav>

            {
                //the navigation is currently specified to be a floating action button 
                //that will toggle a menu containing links for navigating the application 
            }

            <img id='menu-icon' src={menuIcon} alt='hamburger menu icon'/>

        </nav>

    );

}

//ES6 export statement
export default Nav;