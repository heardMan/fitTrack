/**
 * @name EditExerciseForm.js
 * @author Mark Heard
 * @version 1.0
 * @copyright 2021
 * @component A simple header comoponent used to display a title logo
 */

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NewExerciseForm from '../views/NewExerciseForm.js'

const EditExerciseForm = props => {
    //props.mode - create or edit
    //props.exercise

    const { getAccessTokenSilently } = useAuth0();

    const [data, setData] = useState([]);

    let {id} = useParams();

    async function getData(url = '', data = {}) {
        // Default options are marked with *
        const accessToken = await getAccessTokenSilently({
                         audience: `fitStat`,
                     });

        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Authorization': `Bearer ${accessToken}`
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    useEffect(()=>{
        getData(`http://localhost:5000/exercise_templates/${id}`)
                        .then(data => {
                            setData(data.exercise); // JSON data parsed by `data.json()` call
                        });
    },[])

    return (

        // a header tag is returned as the parent element to keep HTML semantic

        <div className='exercise-card'>
            <NewExerciseForm exercise={data}/>
        </div >

    );

}

//ES6 export statement
export default EditExerciseForm;