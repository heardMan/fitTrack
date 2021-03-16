/**
 * @name Exercises.js
 * @author Mark Heard
 * @version 1.0
 * @copyright 2021
 * @view A home view for the fitTrack application
 */

import SearchableList from "../components/SearchableList.js"

import { Link } from "react-router-dom";

const Exercises = () => {
    
    return (
        //return a parent node with the id of home is returned with
        //in the main tag of the application
        <div id='exercises'>
            <Link id='new-exercise-link' to='/newexercise'>new exercise</Link>
            <SearchableList title={'exercises'} responseKey={'exercises'} endpoint={'exercise_templates'}/>
        </div >
        
    );

}

//ES6 export statement
//export default Exercises;

export default Exercises;