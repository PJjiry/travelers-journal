import React, {ChangeEvent, createContext, ReactNode, useEffect} from 'react';
import {PackingListContextType, PackingListItem} from '../types.ts';
import {addPackingListItem, deletePackingListItem, editPackingListItem, loadPackingListItems} from '../firebaseAPI.ts';


const PackingListContext = createContext<PackingListContextType | null>(null);

export const PackingListProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [packingList, setPackingList] = React.useState<PackingListItem[]>([]);
    const [newItem, setNewItem] = React.useState<string>('');
    const [hasSameName, setHasSameName] = React.useState<boolean>(false);
    const [editingItem, setEditingItem] = React.useState<string | null>(null);
    const [editedItemText, setEditedItemText] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    useEffect(() => {
        const loadPackingListFromDB = async () => {
            try {
                setLoading(true);
                const packingListFromDB = await loadPackingListItems();
                setPackingList(packingListFromDB);
            } catch (error) {
                console.error('Error loading packing list from DB:', error);
                setError('Error loading packing list from DB');
            } finally {
                setLoading(false);
            }
        }
        loadPackingListFromDB()
    }, []);

    const handleEditMode = (itemId: string) => {
        const itemToEdit = packingList.find(item => item.id === itemId);
        if (itemToEdit && itemToEdit.packed) {
            return;
        }
        setEditingItem(itemId);
        if (itemToEdit) {
            setEditedItemText(itemToEdit.name);
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewItem(e.target.value);
        setHasSameName(false);
    }

    const handleAddItem = async () => {
        if (loading||!newItem) {
            return;
        }

        if (packingList.find(item => item.name === newItem)) {
            setHasSameName(true);
            return;
        }

        const newId = newItem.toLowerCase() + (Math.floor(Math.random() * 1000000)).toString();
        const newListItem: PackingListItem = {
            id: newId,
            name: newItem,
            packed: false
        }

        try {
            await addPackingListItem(newListItem);
            const packingListFromDB = await loadPackingListItems();
            setPackingList(packingListFromDB);
        } catch (error) {
            console.error('Error adding new item to DB:', error);
            setError('Error adding new item to DB');
        }

        setNewItem('');
        setHasSameName(false);
    }


    const handleCheckItem = async (itemId: string) => {
        if (loading) {
            return;
        }

        const itemToCheck = packingList.find(item => item.id === itemId);
        if (!itemToCheck) {
            return;
        }

        const updatedItem: PackingListItem = {
            ...itemToCheck,
            packed: !itemToCheck.packed
        }

        try {
            await editPackingListItem(itemToCheck.id, updatedItem);
            itemToCheck.packed = !itemToCheck.packed;
            setPackingList([...packingList]);
        } catch (error) {
            console.error('Error updating item in DB:', error);
            setError('Error updating item in DB');
        }
    }

    const handleSaveEditedItem = async () => {
        if (loading) {
            return;
        }

        if (!editedItemText) {
            return;
        }

        const itemToEdit = packingList.find(item => item.id === editingItem);
        if (!itemToEdit) {
            return;
        }

        const updatedItem: PackingListItem = {
            ...itemToEdit,
            name: editedItemText
        }

        try {
            await editPackingListItem(itemToEdit.id, updatedItem);
            itemToEdit.name = editedItemText;
            setPackingList([...packingList]);
            setEditedItemText('');
            setEditingItem(null);
        } catch (error) {
            console.error('Error updating item in DB:', error);
            setError('Error updating item in DB');
        }
    }

    const handleDeleteItem = async (itemId: string) => {
        if (loading) {
            return;
        }

        const itemToDelete = packingList.find(item => item.id === itemId);
        if (!itemToDelete || itemToDelete.packed) {
            return;
        }

        try {
            await deletePackingListItem(itemToDelete.id);
            const newPackingList = packingList.filter(item => item.id !== itemId);
            setPackingList(newPackingList);
        } catch (error) {
            console.error('Error deleting item from DB:', error);
            setError('Error deleting item from DB');
        }
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
        handleEditedItemChange,
        loading,
        error,
    }

    return (
        <PackingListContext.Provider value={packingListContextValue}>
            {children}
        </PackingListContext.Provider>
    )
}

export default PackingListContext;