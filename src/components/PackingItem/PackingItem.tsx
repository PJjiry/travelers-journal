import React from 'react';
import classes from './PackingItem.module.css';
import {FaCheck} from 'react-icons/fa';
import {MdModeEdit} from 'react-icons/md';
import {AiFillDelete} from 'react-icons/ai';
import {PackingItemProps} from '../../types.ts';

const PackingItem:React.FC<PackingItemProps> = ({item, onCheckItem, editingItem, editedItemText, onEditedItemChange, onSaveEditedItem, onEditMode, onRemoveItem}) => {
    return (
        <li key={item.name}
            className={item.packed ? `${classes.listItem} ${classes.packed}` : classes.listItem}>
            <input type="checkbox" onChange={() => onCheckItem(item.name)}
                   checked={item.packed}/>
            {editingItem === item.name ?
                <input className={classes.editInput} type="text" value={editedItemText}
                       onChange={onEditedItemChange}/> :
                <span>{item.name}</span>}
            <div className={classes.actions}>
                {editingItem === item.name ?
                    <FaCheck className={classes.checkButton} onClick={onSaveEditedItem}/> :
                    <>
                        <MdModeEdit className={classes.editButton}
                                    onClick={() => onEditMode(item.name)}/>
                        <AiFillDelete className={classes.deleteButton}
                                      onClick={() => onRemoveItem(item.name)}/>
                    </>}
            </div>
        </li>
    )
}
export default PackingItem