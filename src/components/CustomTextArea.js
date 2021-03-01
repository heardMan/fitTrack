/**
 * @name CustomTextArea.js
 * @author Mark Heard
 * @version 1.0
 * @copyright 2021
 * @component A simple header comoponent used to display a title logo
 */

import { useState } from "react";

const CustomTextArea = props => {

    const [focus, setFocus] = useState(false);

    return (

        // a header tag is returned as the parent element to keep HTML semantic

        <div className='input-container'>
            <label htmlFor={props.name} className={focus || props.value.length>0 ? 'focused' : 'blurred'}>{props.label}</label>
            <textarea
                name={props.name}
                className='form-input'
                type={props.type}
                value={props.value}
                onFocus={e => setFocus(true)}
                onBlur={e => setFocus(false)}
                onChange={e=>props.onChange(e.target.value)}
            />
        </div>

    );

}

//ES6 export statement
export default CustomTextArea;