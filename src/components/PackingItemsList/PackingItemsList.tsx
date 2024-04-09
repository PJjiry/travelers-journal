import React from 'react';
import classes from './PackingItemsList.module.css'
import PackingItem from '../PackingItem/PackingItem.tsx';
import PackingListContext from '../../store/PackingListContext.tsx';

// Component for displaying the list of packing items
const PackingItemsList: React.FC = () => {

    // importing the packing list context to use its state
    const packingListCtx = React.useContext(PackingListContext);
    if (!packingListCtx) {
        return null;
    }
    const {packingList} = packingListCtx;

    // Render the list of packing items
    return (
        <ul className={classes.list}>
            {packingList.map((item) => (
                <PackingItem
                    key={item.id} item={item}
                />
            ))}
        </ul>
    )
}

export default PackingItemsList