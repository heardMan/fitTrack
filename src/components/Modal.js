/**
 * @name Footer.js
 * @author Mark Heard
 * @version 1.0
 * @copyright 2021
 * @component A simple header comoponent used to display a title logo
 */

import closeIcon from "../close-white-18dp.svg";

{/* <Modal open={ } title={ } /> */ }

const Modal = props => {

    const close = e => {
        e.preventDefault()
        props.setOpen(false)
    }


    return (

        // a header tag is returned as the parent element to keep HTML semantic

        <div id='modal' className={props.open ? 'open-modal' : 'closed-modal'}>
            
            <div id='modal-content'>

                <button
                    id='close-modal'
                    onClick={close}>
                    <img id='close-modal-icon' src={closeIcon} alt='close menu icon' />

                </button>

                {props.children}

            </div>

        </div>

    );

}

//ES6 export statement
export default Modal;

