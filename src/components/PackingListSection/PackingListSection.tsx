import React from 'react';
import classes from './PackingListSection.module.css';
import AddPackingItem from '../AddPackingItem/AddPackingItem.tsx';
import PackingItemsList from '../PackingItemsList/PackingItemsList.tsx';
import PackingListContext from '../../store/PackingListContext.tsx';

// Component for the packing list section that contains the packing list items and add item form
const PackingListSection: React.FC = () => {

    // importing the packing list context to use its state
    const packingListCtx = React.useContext(PackingListContext);
    if (!packingListCtx) {
        return null;
    }
    const {packingList} = packingListCtx;

    // Render the packing list section with the title, add item form, and list of items
    return (
        <section className={classes.packingListSection}>
            <div className={classes.title}>
                <h3>Packing List</h3>
            </div>
            <AddPackingItem/>
            <div className={classes.packingListItems}>
                {packingList.length === 0 ?
                    <p className={classes.emptyList}>Your list is empty. Add items to get started.</p>
                    :
                    <>
                        <p>Here is a list of items you may need to pack for your trips:</p>
                        <PackingItemsList/>
                    </>}
            </div>
        </section>
    )
}

export default PackingListSection