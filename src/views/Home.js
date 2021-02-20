/**
 * @name Home.js
 * @author Mark Heard
 * @version 1.0
 * @copyright 2021
 * @view A home view for the fitTrack application
 */

import LogOutBtnAuth0 from "../components/LogOutBtnAuth0.js";
const Home = () => {
    
    return (
        //return a parent node with the id of home is returned with
        //in the main tag of the application
        <div id='home'>
            <p>testing home</p>
            <p>if this is displaying you are logged in!</p>
            <LogOutBtnAuth0/>


            {
                //present a general page broken up into sections
                //one for each category of action maybe this could 
                //also be a good place for notifications and messages
            }

        </div >
        
    );

}

//ES6 export statement
export default Home;