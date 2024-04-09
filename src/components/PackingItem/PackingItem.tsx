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
        handleSaveEditedItem,
        loading
    } = PackingListCtx;

    return (
        <li className={item.packed ? `${classes.listItem} ${classes.packed}` : classes.listItem}>
            <input type="checkbox" disabled={loading||editingItem===item.id} onChange={() => handleCheckItem(item.id)}
                   checked={item.packed}/>
            {editingItem === item.id ?
                <input className={classes.editInput} type="text" value={editedItemText}
                       onChange={handleEditedItemChange}/> :
                <span>{item.name}</span>}
            <div className={classes.actions}>
                {editingItem === item.id ?
                    <FaCheck className={classes.checkButton} aria-disabled={loading} onClick={handleSaveEditedItem}/> :
                    <>
                        <MdModeEdit aria-disabled={loading} className={classes.editButton}
                                    onClick={() => handleEditMode(item.id)}/>
                        <AiFillDelete className={classes.deleteButton} aria-disabled={loading}
                                      onClick={() => handleDeleteItem(item.id)}/>
                    </>}
            </div>
        </li>
    )
}
export default PackingItem