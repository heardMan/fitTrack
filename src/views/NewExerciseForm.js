/**
 * @name Exercises.js
 * @author Mark Heard
 * @version 1.0
 * @copyright 2021
 * @view A home view for the fitTrack application
 */

import React, { useEffect, useState, Fragment } from 'react';
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import CustomTextInput from "../components/CustomTextInput.js";
import CustomTextArea from "../components/CustomTextArea.js";

const NewExerciseForm = props => {
    //props.mode - create or edit
    //props.exercise

    const { getAccessTokenSilently } = useAuth0();

    const [mode, setMode] = useState('create');

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [instructions, setInstructions] = useState([]);
    const [instructionModalOpen, setInstructionModalOpen] = useState(false);
    const [currentInstruction, setCurrentInstruction] = useState({ 'content': '', 'index': 0 });


    const [media, setMedia] = useState([]);
    const [mediaModalOpen, setMediaModalOpen] = useState(false);
    const [currentMedia, setCurrentMedia] = useState({ 'content': '', 'index': 0 });

    const [errorMsg, setErrorMsg] = useState({ 'msg': '', 'code': null });
    const [errorModalOpen, setErrorModalOpen] = useState(false);

    const [successMsg, setSuccessMsg] = useState('');
    const [successModalOpen, setSuccessModalOpen] = useState(false);

    const [deleteMsg, setDeleteMsg] = useState({ 'msg': '', 'code': null });
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const [apiData, setAPIData] = useState([]);

    const resetForm = () => {
        setName('');
        setDescription('');
        setInstructions([]);
        setInstructionModalOpen(false);
        setCurrentInstruction({ 'content': '', 'index': 0 });
        setMedia([]);
        setMediaModalOpen(false);
        setCurrentMedia({ 'content': '', 'index': 0 });
    }

    const updateCurrentMedia = (content, index) => setCurrentMedia({ 'content': content, 'index': index })

    const saveMedia = () => {
        setMediaModalOpen(false)
        const newMedia = [...media]
        newMedia[currentMedia.index] = { 'content': currentMedia.content, 'index': currentMedia.index }
        setMedia(newMedia)
        setMediaModalOpen(false);
    }

    const deleteMedia = () => {
        setMediaModalOpen(false)

        setMedia(media.filter(mediaItem => mediaItem.index !== currentMedia.index))

        const newMedia = media.filter(mediaItem => mediaItem.index !== currentMedia.index)
        newMedia.map((media, i) => media.index = i)
        setMedia(newMedia)
    }

    const updateCurrentInstruction = (content, index) => setCurrentInstruction({ 'content': content, 'index': index })

    const saveInstruction = () => {
        const newInstructions = [...instructions];
        newInstructions[currentInstruction.index] = { 'content': currentInstruction.content, 'index': currentInstruction.index };
        setInstructions(newInstructions);
        setInstructionModalOpen(false);

    }

    const deleteInstruction = () => {
        setInstructionModalOpen(false);
        const newInstructions = instructions.filter(instructionItem => instructionItem.index !== currentInstruction.index);
        newInstructions.map((instruction, i) => instruction.index = i);
        setInstructions(newInstructions);
    }

    async function getData(url = '', data = {}, method = 'GET') {
        // Default options are marked with *
        const accessToken = await getAccessTokenSilently({
            audience: `fitStat`,
        });

        const response = await fetch(url, {
            method: method.toLocaleUpperCase(), // *GET, POST, PUT, DELETE, etc.
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
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    const createNewExercise = () => {
        getData('http://localhost:5000/exercise_templates', { 'name': name, 'description': description }, 'POST')
            .then(res => {
                console.log(res); // JSON data parsed by `data.json()` call
                if (res.success === true) {
                    setSuccessMsg(`Exercise: ${res.new_exercise.name} Was Added Successfully`);
                    setSuccessModalOpen(true);
                } else if (res.success === false) {
                    setErrorMsg({ 'msg': res.message, 'code': res.error });
                    setErrorModalOpen(true);
                }

            });
    }

    const updateExercise = () => {
        getData(`http://localhost:5000/exercise_templates/${props.exercise.id}`, { 'name': name, 'description': description }, 'PATCH')
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

    const deleteExercise = () => {
        getData(`http://localhost:5000/exercise_templates/${props.exercise.id}`, {}, 'DELETE')
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

    useEffect(() => {

        if (props.exercise) {
            console.log(props)
            if (props.exercise.name !== undefined) {
                setMode('edit');
                setName(props.exercise.name);
                setDescription(props.exercise.description);
            }

        }

    }, [props.exercise])

    return (
        //return a parent node with the id of home is returned with
        //in the main tag of the application
        <>
            <form id='new-exercise'>
            {console.log(mode)}
                {
                    //comment
                    //console.log(props)

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
                    <h3>instructions</h3>

                    {
                        instructions.length > 0 ?
                            instructions.map((text, i) => {

                                return (<div key={i} onClick={() => {
                                    setCurrentInstruction({ 'content': instructions[i].content, 'index': i });
                                    setInstructionModalOpen(true);

                                }} className='exercise-instruction'> {`Item ${i} >`} </div>)

                            })
                            :
                            <div>no instructions added ...yet</div>
                    }
                    <button className='btn'
                        onClick={e => {
                            e.preventDefault();

                            const newInstruction = { 'content': '', 'index': instructions.length };
                            const newInstructions = instructions.length > 0 ? [...instructions, newInstruction] : [newInstruction];

                            setCurrentInstruction(newInstruction)
                            setInstructions(newInstructions)
                            setInstructionModalOpen(true);

                        }}
                    >add instruction</button>

                </div>

                <div className='form-field'>
                    <h3>media</h3>

                    {
                        media.length > 0 ?
                            media.map((text, i) => {

                                return (<div key={i} onClick={() => {
                                    setCurrentMedia({ 'content': media[i].content, 'index': i });
                                    setMediaModalOpen(true);

                                }} className='exercise-media'> {`Media ${i} >`} </div>)

                            })
                            :
                            <div>no media added ...yet</div>
                    }
                    <button className='btn'
                        onClick={e => {
                            e.preventDefault();

                            const newMediaItem = { 'content': '', 'index': media.length };
                            const newMedia = [...media, newMediaItem];

                            setCurrentMedia(newMediaItem);
                            setMedia(newMedia);
                            setMediaModalOpen(true);

                        }}
                    >add media</button>

                </div>
                <hr />

                <div className='form-field'>

                    <button className='btn' onClick={e => {
                        e.preventDefault();
                        mode === 'edit' ? updateExercise() : createNewExercise();

                    }}><strong>{mode === 'edit' ? 'Update Exercise' : 'Save Exercise'}</strong></button>

                </div>

                {
                    mode === 'edit' ?

                        <div className='form-field'>

                            <button className='delete btn' onClick={e => {
                                e.preventDefault();
                                setDeleteModalOpen(true);

                            }}><strong>Delete Exercise</strong></button>

                        </div>

                        :
                        null
                }
            </form >

            <div id='modal' className={mediaModalOpen ? 'open-modal' : 'closed-modal'}>
                <div id='modal-content'>

                    <h3>Media</h3>

                    <button
                        id='close-modal'
                        onClick={e => setMediaModalOpen(false)}>
                        x
                        </button>

                    <CustomTextInput
                        type='text'
                        name={`media-item-${currentMedia.index}`}
                        label={`media item ${currentMedia.index}`}
                        value={(currentMedia.content)}
                        onChange={item => updateCurrentMedia(item, currentMedia.index)}
                    />

                    <button
                        id='save-media'
                        className='btn'
                        onClick={saveMedia}>
                        Save
                        </button>

                    <button
                        id='delete-media'
                        className='btn'
                        onClick={deleteMedia}>
                        Delete
                        </button>

                </div>

            </div>

            <div id='modal' className={instructionModalOpen ? 'open-modal' : 'closed-modal'}>
                <div id='modal-content'>

                    <h3>Instructions</h3>

                    <button
                        id='close-modal'
                        onClick={e => setInstructionModalOpen(false)}>
                        x
                        </button>

                    <CustomTextInput
                        type='text'
                        name={`instruction-item-${currentInstruction.index}`}
                        label={`instruction item ${currentInstruction.index}`}
                        value={(currentInstruction.content)}
                        onChange={item => updateCurrentInstruction(item, currentInstruction.index)}
                    />

                    <button
                        id='save-instruction'
                        className='btn'
                        onClick={saveInstruction}>
                        Save
                        </button>

                    <button
                        id='delete-instruction'
                        className='btn'
                        onClick={deleteInstruction}>
                        Delete
                        </button>

                </div>

            </div>

            <div id='modal' className={successModalOpen ? 'open-modal' : 'closed-modal'}>
                <div id='modal-content'>

                    <h3>Success</h3>

                    <button
                        id='close-modal'
                        onClick={e => setSuccessModalOpen(false)}>
                        x
                        </button>

                    <p>{successMsg}</p>

                    <Link to='/exercises'>Back to Catalog</Link>

                    {mode !== 'delete' ?
                    
                    
                    <button
                        id=''
                        className='btn'
                        onClick={e => {
                            resetForm();
                            setSuccessModalOpen(false);
                        }}>
                            
                        {
                            mode === 'edit' ? 'Make More Edits' : 'Add Another Exercise'
                        }

                    </button>
                    : 
                    null
                    }

                </div>

            </div>




            <div id='modal' className={errorModalOpen ? 'open-modal' : 'closed-modal'}>
                <div id='modal-content'>

                    <h3>Error</h3>

                    <button
                        id='close-modal'
                        onClick={e => setErrorModalOpen(false)}>
                        x
                        </button>

                    <p>{errorMsg.code}</p>
                    <p>{errorMsg.msg}</p>

                    <button
                        id='save-instruction'
                        className='btn'
                        onClick={e => setErrorModalOpen(false)}>
                        Ok
                        </button>

                </div>

            </div>



            <div id='modal' className={deleteModalOpen ? 'open-modal' : 'closed-modal'}>
                <div id='modal-content'>

                    <h3>Delete</h3>

                    <button
                        id='close-modal'
                        onClick={e => setDeleteModalOpen(false)}>
                        x
                        </button>

                    <p>{`Are you sure you you want to delete ${props.exercise !== undefined ? props.exercise.name: null} from the exercise catalog?`}</p>

                    <button
                        id='delete-instruction'
                        className='btn'
                        onClick={e => {
                            deleteExercise();
                            }}>
                        Delete
                        </button>

                    <button
                        id='save-instruction'
                        className='btn'
                        onClick={e => setDeleteModalOpen(false)}>
                        Don't Delete
                        </button>

                </div>

            </div>



        </>

    );

}

//ES6 export statement
//export default Exercises;

export default NewExerciseForm;