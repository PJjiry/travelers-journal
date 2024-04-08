import React from 'react';
import classes from './PackingItemsList.module.css'
import {PackingItemsListProps} from '../../types.ts';
import PackingItem from '../PackingItem/PackingItem.tsx';

const PackingItemsList:React.FC<PackingItemsListProps> = ({packingList, onEditMode,onRemoveItem,onSaveEditedItem,onCheckItem, editingItem, editedItemText, onEditedItemChange}) => {

    return(
        <ul className={classes.list}>
            {packingList.map((item) => (
                <PackingItem
                    key={item.name} item={item}
                    onCheckItem={onCheckItem}
                    onEditMode={onEditMode}
                    onRemoveItem={onRemoveItem}
                    onSaveEditedItem={onSaveEditedItem}
                    editedItemText={editedItemText}
                    editingItem={editingItem}
                    onEditedItemChange={onEditedItemChange}
                />
            ))}
        </ul>
    )
}
export default PackingItemsList