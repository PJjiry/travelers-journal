import React from 'react';
import classes from './PackingItem.module.css';
import {FaCheck} from 'react-icons/fa';
import {MdModeEdit} from 'react-icons/md';
import {AiFillDelete} from 'react-icons/ai';
import {PackingListItem} from '../../types.ts';
import PackingListContext from '../../store/PackingListContext.tsx';

const PackingItem: React.FC<{ item: PackingListItem }> = ({item}) => {
    const PackingListCtx = React.useContext(PackingListContext);
    if (!PackingListCtx) {
        return null;
    }
    const {
        handleCheckItem,
        handleDeleteItem,
        handleEditMode,
        editingItem,
        editedItemText,
        handleEditedItemChange,
        handleSaveEditedItem
    } = PackingListCtx;

    return (
        <li key={item.name}
            className={item.packed ? `${classes.listItem} ${classes.packed}` : classes.listItem}>
            <input type="checkbox" onChange={() => handleCheckItem(item.name)}
                   checked={item.packed}/>
            {editingItem === item.name ?
                <input className={classes.editInput} type="text" value={editedItemText}
                       onChange={handleEditedItemChange}/> :
                <span>{item.name}</span>}
            <div className={classes.actions}>
                {editingItem === item.name ?
                    <FaCheck className={classes.checkButton} onClick={handleSaveEditedItem}/> :
                    <>
                        <MdModeEdit className={classes.editButton}
                                    onClick={() => handleEditMode(item.name)}/>
                        <AiFillDelete className={classes.deleteButton}
                                      onClick={() => handleDeleteItem(item.name)}/>
                    </>}
            </div>
        </li>
    )
}
export default PackingItem