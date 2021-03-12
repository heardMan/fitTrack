/**
 * @name CustomList.js
 * @author Mark Heard
 * @version 1.0
 * @copyright 2021
 * @component A simple header comoponent used to display a title logo
 */

 import React, { useState, Fragment, useParams } from 'react';
 import CustomTextInput from "../components/CustomTextInput.js";
 import Modal from './Modal.js';

const CustomList = props => {
    
    const [modalOpen, setModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState({ 'content': '', 'index': 0 });

    const updateCurrentItem = (content, index) => setCurrentItem({ 'content': content, 'index': index });

    const addItem = e => {

        e.preventDefault();

        const newItem = { 'content': '', 'index': props.items.length };
        const newItems = props.items.length > 0 ? [...props.items, newItem] : [newItem];

        setCurrentItem(newItem);
        
        setModalOpen(true);
        props.setItems(newItems);
    }

    const saveItem = e => {
        e.preventDefault();
        const newItems = [...props.items];
        newItems[currentItem.index] = { 'content': currentItem.content, 'index': currentItem.index };
        
        props.setItems(newItems);
        return setModalOpen(false);

    }

    const openItem = (e,i) => {
        e.preventDefault();
        setCurrentItem({ 'content': props.items[i].content, 'index': i });
        setModalOpen(true);
    }

    const deleteItem = e => {
        e.preventDefault();
        setModalOpen(false);
        const newItems = props.items.filter(instructionItem => instructionItem.index !== currentItem.index);
        newItems.map((instruction, i) => instruction.index = i);
        props.setItems(newItems);
    }

    return (

        // a header tag is returned as the parent element to keep HTML semantic
        <>
        <div className='custom-list'>
            <h3>{props.title}</h3>
            <ul>
                {
                    props.items.length > 0 ?

                        props.items.map((item, i) => {
                            return (
                                <li key={i} >
                                    <div onClick={e => { openItem(e,i) }}
                                        className='exercise-instruction'>
                                        {`Item ${i} >`}
                                    </div>
                                </li>
                            )
                        })

                        :

                        <li>no items added ...yet</li>
                }
                <li>
                    <button className='btn' onClick={addItem} > add item </button>
                </li>
            </ul>

        </div >
        <Modal open={modalOpen} setOpen={setModalOpen}>

                <h3>Instructions</h3>

                <CustomTextInput
                    type='text'
                    name={`instruction-item-${currentItem.index}`}
                    label={`instruction item ${currentItem.index}`}
                    value={(currentItem.content)}
                    onChange={item => updateCurrentItem(item, currentItem.index)}
                />

                <button
                    id='save-instruction'
                    className='btn'
                    onClick={saveItem}>
                    Save
                    </button>

                <button
                    id='delete-instruction'
                    className='btn'
                    onClick={deleteItem}>
                    Delete
                    </button>

            </Modal>
        </>

    );

}

//ES6 export statement
export default CustomList;