import React, {ChangeEvent, createContext, ReactNode} from 'react';
import {PackingListContextType, PackingListItem} from '../types.ts';



const PackingListContext = createContext<PackingListContextType | null>(null);

export const PackingListProvider:React.FC<{children:ReactNode}>=({children})=>{
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

    const packingListContextValue: PackingListContextType = {
        packingList,
        newItem,
        hasSameName,
        editingItem,
        editedItemText,
        handleEditMode,
        handleInputChange,
        handleAddItem,
        handleCheckItem,
        handleSaveEditedItem,
        handleDeleteItem,
        handleEditedItemChange
    }

    return(
        <PackingListContext.Provider value={packingListContextValue}>
            {children}
        </PackingListContext.Provider>
    )
}

export default PackingListContext;