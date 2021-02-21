/**
 * @name Menu.js
 * @author Mark Heard
 * @version 1.0
 * @copyright 2021
 * @view A menu view for the fitTrack application
 */

import { Link } from "react-router-dom";

const Menu = () => {
    
    return (
        //return a parent node with the id of menu is returned with
        //list of links- each leading to 
        <div id='menu'>
            <p>menu page</p>
            <p>you are LOGGED IN</p>
            <Link to="/exercises">Exercise Catalog</Link>
            <Link to="/workouts">Workout Catalog</Link>
            <Link to="/userworkouts">Workouts</Link>
            <Link to="/settings">Settings</Link>
        </div >
    );

}

//ES6 export statement
export default Menu;