/**
 * @name Footer.js
 * @author Mark Heard
 * @version 1.0
 * @copyright 2021
 * @component A simple header comoponent used to display a title logo
 */

<Modal open={} title={} />

const Modal = props => {

    return (

        // a header tag is returned as the parent element to keep HTML semantic

        <div id='media-modal' className={props.open ? 'open-media-modal' : 'closed-media-modal'}>
                <div id='media-modal-content'>

                    <h3>props.title</h3>

                    <button
                        id='close-media-modal'
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

    );

}

//ES6 export statement
export default Modal;

