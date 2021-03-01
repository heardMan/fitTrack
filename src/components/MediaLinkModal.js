/**
 * @name ExerciseStepModal.js
 * @author Mark Heard
 * @version 1.0
 * @copyright 2021
 * @component A simple Modal comoponent
 */

const Modal = props => {

    return (

        // a header tag is returned as the parent element to keep HTML semantic

        <div id='exercisemodal'>
            <button>x</button>
            <h3>{props.title}</h3>
            <p>{props.message}</p>
            <button>Save</button>
            <button>Delete</button>
        </div >

    );

}

//ES6 export statement
export default Modal;