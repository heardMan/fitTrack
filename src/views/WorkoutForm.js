/**
 * @name Exercises.js
 * @author Mark Heard
 * @version 1.0
 * @copyright 2021
 * @view A home view for the fitTrack application
 */

 import React, { useEffect, useState, Fragment } from 'react';
 import { useParams, Link } from "react-router-dom";
 import { useAuth0 } from "@auth0/auth0-react";
 import CustomTextInput from "../components/CustomTextInput.js";
 import CustomTextArea from "../components/CustomTextArea.js";
 import CustomList from "../components/CustomList.js";
 import Modal from '../components/Modal.js';
 
 const WorkoutForm = props => {
 
     const modes = ['create','edit','delete']
 
     let { id } = useParams();
 
     const { getAccessTokenSilently } = useAuth0();
 
     const [mode, setMode] = useState('create');
 
     const [name, setName] = useState('');
     const [description, setDescription] = useState('');
     const [exercises, setExercises] = useState([]);
     const [media, setMedia] = useState([]);
     const [exercisesOptions, setExerciseOptions] = useState([]);
 
     const [errorMsg, setErrorMsg] = useState({ 'msg': '', 'code': null });
     const [errorModalOpen, setErrorModalOpen] = useState(false);
 
     const [successMsg, setSuccessMsg] = useState('');
     const [successModalOpen, setSuccessModalOpen] = useState(false);
 
     const [deleteMsg, setDeleteMsg] = useState({ 'msg': '', 'code': null });
     const [deleteModalOpen, setDeleteModalOpen] = useState(false);
 
     const resetForm = () => {
         setName('');
         setDescription('');
         setExercises([]);
         setMedia([]);
     }
 
     async function getData(url = '', data = {}, method = 'GET') {
         // Default options are marked with *
         const accessToken = await getAccessTokenSilently({
             audience: `fitStat`,
         });
 
         const params = {
             method: method.toUpperCase(), // *GET, POST, PUT, DELETE, etc.
             mode: 'cors', // no-cors, *cors, same-origin
             cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
             credentials: 'same-origin', // include, *same-origin, omit
             headers: {
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${accessToken}`,
                 // 'Content-Type': 'application/x-www-form-urlencoded',
             },
             redirect: 'follow', // manual, *follow, error
             referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
             //body: JSON.stringify(data) // body data type must match "Content-Type" header
         }
 
         if (method.toUpperCase() !== 'GET') {
             params.body = JSON.stringify(data);
         }
 
         const response = await fetch(url, params);
 
         return response.json(); // parses JSON response into native JavaScript objects
 
     }

     const readExercises = () => {
        getData(`http://localhost:5000/exercise_templates/`, {}, 'GET')
            .then(res => {
                console.log(res); // JSON data parsed by `data.json()` call
                setExerciseOptions(res.exercises)
                
            });
    }
 
     const createNewWorkout = () => {
         getData('http://localhost:5000/workout_templates', { 'name': name, 'description': description, 'exercises': exercises }, 'POST')
             .then(res => {
                 console.log(res); // JSON data parsed by `data.json()` call
                 if (res.success === true) {
                     setSuccessMsg(`Workout: ${res.new_exercise.name} Was Added Successfully`);
                     setSuccessModalOpen(true);
                 } else if (res.success === false) {
                     setErrorMsg({ 'msg': res.message, 'code': res.error });
                     setErrorModalOpen(true);
                 }
 
             });
     }
 
     const readWorkout = () => {
         getData(`http://localhost:5000/workout_templates/${id}`, {}, 'GET')
             .then(res => {
                 console.log(res); // JSON data parsed by `data.json()` call
                 setName(res.exercise.name)
                 setDescription(res.exercise.description)
             });
     }
 
     const updateWorkout = () => {
         getData(`http://localhost:5000/workout_templates/${id}`, { 'name': name, 'description': description, 'exercises': exercises }, 'PATCH')
             .then(res => {
                 console.log(res); // JSON data parsed by `data.json()` call
                 if (res.success === true) {
                     setSuccessMsg(`Exercise: ${res.edited_exercise.name} Was Updated Successfully`);
                     setSuccessModalOpen(true);
                 } else if (res.success === false) {
                     setErrorMsg({ 'msg': res.message, 'code': res.error });
                     setErrorModalOpen(true);
                 }
 
             });
     }
 
     const deleteWorkout = e => {
         e.preventDefault();
         getData(`http://localhost:5000/workout_templates/${id}`, {}, 'DELETE')
             .then(res => {
                 console.log(res); // JSON data parsed by `data.json()` call
                 if (res.success === true) {
 
                     setDeleteModalOpen(false);
                     setSuccessMsg(`Exercise: ${res.deleted_exercise.name} Was Deleted Successfully`);
                     setMode('delete');
                     setSuccessModalOpen(true);
 
 
                 } else if (res.success === false) {
                     setErrorMsg({ 'msg': res.message, 'code': res.error });
                     setErrorModalOpen(true);
                 }
 
             });
     }
 
     const saveWorkout = e => {
         e.preventDefault();
         mode === 'edit' ? updateWorkout() : createNewWorkout();
 
     }
 
     const checkBeforeDelete = e => {
         e.preventDefault();
         setDeleteModalOpen(true);
 
     }
 
     useEffect(() => {
 
         if (id !== undefined) {
 
             setMode('edit');
             readWorkout()
 
         }
         readExercises();
 
     }, [])
 
     return (
         //return a parent node with the id of home is returned with
         //in the main tag of the application
         <>
 
             <form id='new-exercise'>
 
                 {
                     //comment
                     console.log(mode)
 
 
                 }
 
                 <div className='form-field'>
 
                     <CustomTextInput
                         type='text'
                         name='name'
                         label='name'
                         value={name}
                         onChange={setName}
                     />
 
                 </div>
 
                 <div className='form-field'>
 
                     <CustomTextArea
                         type='text'
                         name='description'
                         label='description'
                         value={description}
                         onChange={setDescription}
                     />
 
                 </div>
 
                 <div className='form-field'>
 
                     <CustomList
                         title={'exercises'}
                         items={exercises}
                         setItems={setExercises}
                     />
 
                 </div>
 
                 <hr />
 
                 <div className='form-field'>
 
                     <button
                         className='btn'
                         onClick={saveWorkout}>
                         <strong>{'Save Workout'}</strong>
                     </button>
 
                 </div>
 
                 <div className='form-field' >
 
                     {/** 
                      *@TODO - REMOVE MODE VARIABLE
                      */}
 
 
                     <button
                         className={`delete btn ${mode !== 'create' ? null : 'hide'}`}
                         onClick={checkBeforeDelete}>
                         <strong>Delete Workout</strong>
                     </button>
 
                 </div>
             </form>
 
             <Modal open={successModalOpen} setOpen={setSuccessModalOpen}>
                 <h3>Success</h3>
 
                 <p>{successMsg}</p>
 
                 <Link to='/exercises'>Back to Catalog</Link>
 
                 <button
                     //className={'btn' + mode === 'delete' ? 'hide' : null}
                     className={`btn ${mode === 'delete' ? 'hide' : null}`}
                     onClick={e => {
                         resetForm();
                         setSuccessModalOpen(false);
                     }}>
 
 
                     {
                         mode === 'edit' ? 'Make More Edits' : 'Add Another Exercise'
                     }
 
                 </button>
 
 
             </Modal>
 
             <Modal open={errorModalOpen} setOpen={setErrorModalOpen}>
                 <h3>Error</h3>
 
                 <p>{errorMsg.code}</p>
                 <p>{errorMsg.msg}</p>
 
                 <button
                     id='save-instruction'
                     className='btn'
                     onClick={e => setErrorModalOpen(false)}>
                     Ok
                     </button>
 
             </Modal>
 
             <Modal open={deleteModalOpen} setOpen={setDeleteModalOpen}>
 
                 <h3>Delete</h3>
 
                 <p>{`Are you sure you you want to delete ${props.exercise !== undefined ? props.exercise.name : null} from the exercise catalog?`}</p>
 
                 <button
                     id='delete-instruction'
                     className='btn'
                     onClick={deleteWorkout}>
                     Delete
                     </button>
 
                 <button
                     id='save-instruction'
                     className='btn'
                     onClick={e => e.preventDefault()}>
                     Don't Delete
                     </button>
 
             </Modal>
 
         </>
 
     );
 
 }
 
 //ES6 export statement
 //export default Exercises;
 
 export default WorkoutForm;