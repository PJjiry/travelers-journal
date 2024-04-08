import React from 'react';
import classes from './AddPackingItem.module.css'
import {AddPackingItemProps} from '../../types.ts';

const AddPackingItem:React.FC<AddPackingItemProps> = ({newItem,onInputChange, hasSameName, onAddItem}) => {
    return (
        <div className={classes.addItem}>
        <div className={classes.inputDiv}>
            <input type="text" placeholder="Add an item" value={newItem} onChange={onInputChange}/>
            {hasSameName && <p className={classes.error}>Item already exists.</p>}
        </div>
        <button onClick={onAddItem}>Add</button>
    </div>
    )
}
export default AddPackingItem