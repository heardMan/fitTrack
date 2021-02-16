/**
 * @name SignUp.js
 * @author Mark Heard
 * @version 1.0
 * @copyright 2021
 * @view A home view for the fitTrack application
 */

import { Link } from "react-router-dom";

const SignUp = () => {

    return (

        // a parent node with the id of sign-in is returned with in the main tag of the application

        <div id='sign-up'>
            {
                //comment
            }

            <p>Don't have an account?</p>
            <div><Link to="/register">Sign Up</Link></div>

            

        </div >

    );

}

//ES6 export statement
export default SignUp;