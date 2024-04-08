import React from 'react';
import classes from './PackingItemsList.module.css'
import PackingItem from '../PackingItem/PackingItem.tsx';
import PackingListContext from '../../store/PackingListContext.tsx';

const PackingItemsList: React.FC = () => {
    const PackingListCtx = React.useContext(PackingListContext);
    if (!PackingListCtx) {
        return null;
    }
    const {packingList} = PackingListCtx;

    return (
        <ul className={classes.list}>
            {packingList.map((item) => (
                <PackingItem
                    key={item.name} item={item}
                />
            ))}
        </ul>
    )
}
export default PackingItemsList