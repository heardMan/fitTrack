/**
 * @name Register.js
 * @author Mark Heard
 * @version 1.0
 * @copyright 2021
 * @view A home view for the fitTrack application
 */

import { Link } from "react-router-dom";

//Import react library with useState hook.
import React, { useState } from 'react';

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (

        // a parent node with the id of sign-in is returned with in the main tag of the application

        <form id='register'>

            {
                //comment
            }
            <div className='form-field'>
                <label>email</label>
                <input type='email' value={email} placeholder='email' onChange={e => setEmail(e.target.value)} />
            </div>

            <div className='form-field'>
                <label>password</label>
                <input type='password' value={password} placeholder='password' onChange={e => setPassword(e.target.value)} />
            </div>

            <div className='form-field'>
                <label>renter password</label>
                <input type='password' value={password} placeholder='password' onChange={e => setPassword(e.target.value)} />
            </div>

            <div className='form-field'>
                {/* <input type='submit' value='Sign In' /> */}
                <button onClick={e => {
                    e.preventDefault();
                    console.log('click')
                }}><strong>Sign Up</strong></button>
            </div>
        </form >

    );


}

//ES6 export statement
export default Register;