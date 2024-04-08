import React, {useContext} from 'react';
import classes from './AddPackingItem.module.css'
import PackingListContext from '../../store/PackingListContext.tsx';

const AddPackingItem: React.FC = () => {
    const PackingListCtx = useContext(PackingListContext);

    if (!PackingListCtx) {
        return null;
    }
    const {newItem, handleInputChange, handleAddItem, hasSameName} = PackingListCtx;

    return (
        <div className={classes.addItem}>
            <div className={classes.inputDiv}>
                <input type="text" placeholder="Add an item" value={newItem} onChange={handleInputChange}/>
                {hasSameName && <p className={classes.error}>Item already exists.</p>}
            </div>
            <button onClick={handleAddItem}>Add</button>
        </div>
    )
}
export default AddPackingItem