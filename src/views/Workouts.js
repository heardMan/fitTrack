/**
 * @name Workouts.js
 * @author Mark Heard
 * @version 1.0
 * @copyright 2021
 * @view A home view for the fitTrack application
 */

 import SearchableList from "../components/SearchableList.js"

 import { Link } from "react-router-dom";

const Workouts = () => {
    
    return (
        //return a parent node with the id of home is returned with
        //in the main tag of the application
        <div id='workouts'>
            <Link id='new-exercise-link' to='/newworkout'>new workout</Link>
            <SearchableList title={'workouts'} responseKey={'workoouts'} endpoint={'workout_templates'}/>
        </div >
        
        
    );

}

//ES6 export statement
export default Workouts;