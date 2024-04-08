import React, {ChangeEvent} from 'react';
import classes from './PackingListSection.module.css';
import {PackingListItem} from '../../types.ts';
import AddPackingItem from '../AddPackingItem/AddPackingItem.tsx';
import PackingItemsList from '../PackingItemsList/PackingItemsList.tsx';

const PackingListSection:React.FC = () => {
    const [packingList, setPackingList] = React.useState<PackingListItem[]>([]);
    const [newItem, setNewItem] = React.useState<string>('');
    const [hasSameName, setHasSameName] = React.useState<boolean>(false);
    const [editingItem, setEditingItem] = React.useState<string | null>(null);
    const [editedItemText, setEditedItemText] = React.useState<string>('');


    const handleEditMode = (itemText: string) => {
        const itemToEdit = packingList.find(item => item.name === itemText);
        if (itemToEdit && itemToEdit.packed) {
            return;
        }
        setEditingItem(itemText);
        if (itemToEdit) {
            setEditedItemText(itemToEdit.name);
        }
    }


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewItem(e.target.value);
        setHasSameName(false);
    }

    const handleAddItem = () => {
        if (!newItem) {
            return;
        }

        if (packingList.find(item => item.name === newItem)) {
            setHasSameName(true);
            return;
        }

        const newListItem: PackingListItem = {
            name: newItem,
            packed: false
        }
        setPackingList([...packingList, newListItem]);
        setNewItem('');
        setHasSameName(false);
    }

    const handleCheckItem = (itemText: string) => {
        const itemToCheck = packingList.find(item => item.name === itemText);
        if (!itemToCheck) {
            return;
        }
        const newPackingList = packingList.map(item => {
            if (item.name === itemToCheck.name) {
                item.packed = !item.packed;
            }
            return item;
        });
        setPackingList(newPackingList);
    }

    const handleSaveEditedItem = () => {
        if (!editedItemText) {
            return;
        }
        const newPackingList = packingList.map(item => {
            if (item.name === editingItem) {
                item.name = editedItemText;
            }
            return item;
        });
        setPackingList(newPackingList);
        setEditedItemText('');
        setEditingItem(null);
    }

    const handleDeleteItem = (itemText: string) => {
        const itemToDelete = packingList.find(item => item.name === itemText);
        if (!itemToDelete) {
            return;
        }
        if (itemToDelete && itemToDelete.packed) {
            return;
        }
        const newPackingList = packingList.filter(item => item.name !== itemText);
        setPackingList(newPackingList);
    }

    const handleEditedItemChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEditedItemText(e.target.value);
    }

    return (
        <section className={classes.packingListSection}>
            <div className={classes.title}>
                <h3>Packing List</h3>
            </div>
            <AddPackingItem newItem={newItem} hasSameName={hasSameName} onAddItem={handleAddItem} onInputChange={handleInputChange}/>
            <div className={classes.packingListItems}>
                {packingList.length === 0 &&
                    <p className={classes.emptyList}>Your list is empty. Add items to get started.</p>}
                {packingList.length > 0 &&
                    <>
                        <p>Here is a list of items you may need to pack for your trips:</p>
                        <PackingItemsList
                            packingList={packingList}
                            onCheckItem={handleCheckItem}
                            onEditMode={handleEditMode}
                            onInputChange={handleEditedItemChange}
                            onAddItem={handleAddItem}
                            onRemoveItem={handleDeleteItem}
                            onSaveEditedItem={handleSaveEditedItem}
                            editingItem={editingItem}
                            editedItemText={editedItemText}
                            onEditedItemChange={handleEditedItemChange}/>
                </>}
            </div>
        </section>
    )
}
export default PackingListSection