import React, {useContext, memo} from 'react';
import classes from './AddPackingItem.module.css'
import PackingListContext from '../../store/PackingListContext.tsx';

// Component for adding a packing list item
const AddPackingItem: React.FC = memo(() => {
    // importing packing list context to use its state and functions
    const packingListCtx = useContext(PackingListContext);

    if (!packingListCtx) {
        return null;
    }
    const {newItem, handleInputChange, handleAddItem, hasSameName} = packingListCtx;

    // rendering the input field and button, and displaying an error message if the item already exists
    return (
        <div className={classes.addItemContainer}>
            <div className={classes.addItemInput}>
                <input type="text" placeholder="Add an item" value={newItem} onChange={handleInputChange}/>
                {hasSameName && <p className={classes.errorMessage}>Item already exists.</p>}
            </div>
            <button onClick={handleAddItem}>Add</button>
        </div>
    )
})

export default AddPackingItem