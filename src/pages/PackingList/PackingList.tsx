import React, {ChangeEvent} from 'react';
import classes from './PackingList.module.css';
import {MdModeEdit} from "react-icons/md";
import {FaCheck} from "react-icons/fa6";
import {PackingListItem} from '../../types.ts';
import {AiFillDelete} from 'react-icons/ai';

const PackingList: React.FC = () => {
    const [packingList, setPackingList] = React.useState<PackingListItem[]>([]);
    const [newItem, setNewItem] = React.useState<string>('');
    const [hasSameName, setHasSameName] = React.useState<boolean>(false);
    const [editingItem, setEditingItem] = React.useState<string | null>(null);
    const [editedItemText, setEditedItemText] = React.useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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

    return (
        <main className={classes.main}>
            <section className={classes.packingList}>
                <div className={classes.title}>
                    <h3>Packing List</h3>
                </div>
                <div className={classes.addItem}>
                    <div className={classes.inputDiv}>
                        <input type="text" placeholder="Add an item" value={newItem} onChange={handleChange}/>
                        {hasSameName && <p className={classes.error}>Item already exists.</p>}
                    </div>
                    <button onClick={handleAddItem}>Add</button>
                </div>
                <div className={classes.packingListItems}>
                    {packingList.length === 0 && <p className={classes.emptyList}>Your list is empty. Add items to get started.</p>}
                    {packingList.length > 0 && <><p>Here is a list of items you may need to pack for your trips:</p>
                        <ul className={classes.list}>
                            {packingList.map((item) => (
                                <li key={item.name}
                                    className={item.packed ? `${classes.listItem} ${classes.packed}` : classes.listItem}>
                                    <input type="checkbox" onChange={() => handleCheckItem(item.name)}
                                           checked={item.packed}/>
                                    {editingItem === item.name ?
                                        <input className={classes.editInput} type="text" value={editedItemText}
                                               onChange={(e) => setEditedItemText(e.target.value)}/> :
                                        <span>{item.name}</span>}
                                    <div className={classes.actions}>
                                        {editingItem === item.name ?
                                            <FaCheck className={classes.checkButton} onClick={handleSaveEditedItem}/> :
                                            <>
                                                <MdModeEdit className={classes.editButton}
                                                            onClick={() => handleEditMode(item.name)}/>
                                                <AiFillDelete className={classes.deleteButton}
                                                              onClick={() => handleDeleteItem(item.name)}/>
                                            </>}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </>}
                </div>
            </section>
        </main>
    )
}
export default PackingList