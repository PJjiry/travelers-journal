import React from 'react';
import classes from './PackingListSection.module.css';
import AddPackingItem from '../AddPackingItem/AddPackingItem.tsx';
import PackingItemsList from '../PackingItemsList/PackingItemsList.tsx';
import PackingListContext from '../../store/PackingListContext.tsx';

const PackingListSection: React.FC = () => {
    const PackingListCtx = React.useContext(PackingListContext);
    if (!PackingListCtx) {
        return null;
    }
    const {packingList} = PackingListCtx;

    return (
        <section className={classes.packingListSection}>
            <div className={classes.title}>
                <h3>Packing List</h3>
            </div>
            <AddPackingItem/>
            <div className={classes.packingListItems}>
                {packingList.length === 0 &&
                    <p className={classes.emptyList}>Your list is empty. Add items to get started.</p>}
                {packingList.length > 0 &&
                    <>
                        <p>Here is a list of items you may need to pack for your trips:</p>
                        <PackingItemsList/>
                    </>}
            </div>
        </section>
    )
}
export default PackingListSection