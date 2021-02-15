/**
 * @name Header.js
 * @author Mark Heard
 * @version 1.0
 * @copyright 2021
 * @component A simple header comoponent used to display a title logo
 */

// import and create a reference to the text-logo file
import logo from "../text-logo.svg"

const Header = () => {

    return (

        // a header tag is returned as the parent element to keep HTML semantic

        <header id='header'>

            {
                //an img tag is added to display the logo
            }

           <img id='header-logo' src={logo} alt='a light grey outline of the word "fitTrack"'/>

        </header >

    );

}

//ES6 export statement
export default Header;