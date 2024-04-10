import React, {ChangeEvent, createContext, ReactNode, useCallback, useEffect} from 'react';
import {PackingListContextProps, PackingListItem} from '../types.ts';
import {addPackingListItem, deletePackingListItem, editPackingListItem, loadPackingListItems} from '../firebaseAPI.ts';

// Context for the packing list items...it provides the packing list items and functions to manage them
const PackingListContext = createContext<PackingListContextProps | null>(null);

// Provider for the packing list context...it provides the packing list functions to the components
export const PackingListProvider: React.FC<{ children: ReactNode }> = ({children}) => {

    // using state to manage the packing list items, initially to empty array
    const [packingList, setPackingList] = React.useState<PackingListItem[]>([]);

    // using state to manage the new item to be added to the packing list
    const [newItem, setNewItem] = React.useState<string>('');

    // using state to manage if the new item has the same name as an already existing item
    const [hasSameName, setHasSameName] = React.useState<boolean>(false);

    // using state to manage which item is being edited
    const [editingItem, setEditingItem] = React.useState<string | null>(null);

    // using state to manage the text of the edited item...and lately save it
    const [editedItemText, setEditedItemText] = React.useState<string>('');

    // using state to manage the loading state of the packing list...mainly due to server requests
    const [loading, setLoading] = React.useState<boolean>(true);

    // using state to manage the error message...if any complications with the server appear
    const [error, setError] = React.useState<string | null>(null);

    // function to find an item in the packing list by its id
    const findItemInThePackingList = useCallback((itemId: string) => {
        return packingList.find(item => item.id === itemId);
    }, [packingList]);

    // loading the packing list items from the database when the component mounts and set it as a default state
    useEffect(() => {
        const loadPackingListFromDB = async () => {
            try {
                setLoading(true);
                const packingListFromDB = await loadPackingListItems(); // function to load the packing list items from the database
                setPackingList(packingListFromDB); // setting the packing list items as the default state
            } catch (error) {
                console.error('Error loading packing list from DB:', error);
                setError('Error loading packing list from DB'); // setting the error message if any complications with the server appear
            } finally {
                setLoading(false);
            }
        }
        loadPackingListFromDB()
    }, []);

    // function to handle which item enters the edit mode
    const handleEditMode = (itemId: string) => {
        const itemToEdit = findItemInThePackingList(itemId) // finding the item to edit
        if (itemToEdit && itemToEdit.packed) { // if the item is already packed, it cannot be edited
            return;
        }
        setEditingItem(itemId); // setting the item to edit
        if (itemToEdit) {
            setEditedItemText(itemToEdit.name); // setting the text of the edited item
        }
    }

    // function to handle the input change of the new item
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewItem(e.target.value);
        setHasSameName(false);
    }

    // function to handle adding a new item to the packing list
    const handleAddItem = async () => {
        if (loading || !newItem) {
            return;
        }

        if (packingList.find(item => item.name.toLowerCase() === newItem.toLowerCase())) { //if the item already exists in the packing list, it doesn't allow user to add it
            setHasSameName(true);
            return;
        }

        const newId = newItem.toLowerCase() + (Math.floor(Math.random() * 1000000)).toString(); // creating a unique id for the new item

        const newListItem: PackingListItem = {// creating the new item object
            id: newId,
            name: newItem,
            packed: false
        }

        try {
            await addPackingListItem(newListItem);// function to add the new item to the database
            const packingListFromDB = await loadPackingListItems();// function to load the packing list items from the database to enable new item to be edited
            setPackingList(packingListFromDB); // setting the packing list items as the current state
        } catch (error) {
            console.error('Error adding new item to DB:', error);
            setError('Error adding new item to DB');// setting the error message if any complications with the server appear
        }
        setNewItem('');
        setHasSameName(false);
    }

    // function to handle checking an item in the packing list
    const handleCheckItem = async (itemId: string) => {
        if (loading) {
            return;
        }

        const itemToCheck = findItemInThePackingList(itemId);// finding the item to check

        if (!itemToCheck) {
            return;
        }

        const updatedItem: PackingListItem = {// creating the updated item object
            ...itemToCheck,
            packed: !itemToCheck.packed
        }

        try {
            await editPackingListItem(itemToCheck.id, updatedItem);// function to update the item in the database
            itemToCheck.packed = !itemToCheck.packed;// updating the item in the packing list
            setPackingList([...packingList]);
        } catch (error) {
            console.error('Error updating item in DB:', error);
            setError('Error updating item in DB');// setting the error message if any complications with the server appear
        }
    }

    // function to handle saving the edited item and update it in the packing list
    const handleSaveEditedItem = async () => {
        if (loading) {
            return;
        }

        if (!editedItemText || !editingItem) {
            return;
        }

        const itemToEdit = findItemInThePackingList(editingItem);// finding the item to edit

        if (!itemToEdit) {
            return;
        }

        const updatedItem: PackingListItem = {// creating the updated item object
            ...itemToEdit,
            name: editedItemText
        }

        try {
            await editPackingListItem(itemToEdit.id, updatedItem);// function to update the item in the database
            itemToEdit.name = editedItemText;// updating the item text in the packing list
            setPackingList([...packingList]);
            setEditedItemText('');// resetting the edited item text and edited item
            setEditingItem(null);
        } catch (error) {
            console.error('Error updating item in DB:', error);
            setError('Error updating item in DB');// setting the error message if any complications with the server appear
        }
    }

    // function to handle deleting an item from the packing list
    const handleDeleteItem = async (itemId: string) => {
        if (loading) {
            return;
        }

        const itemToDelete = findItemInThePackingList(itemId);// finding the item to delete

        if (!itemToDelete || itemToDelete.packed) {
            return;
        }

        try {
            await deletePackingListItem(itemToDelete.id);// function to delete the item from the database
            const newPackingList = packingList.filter(item => item.id !== itemId);// updating the packing list without the deleted item
            setPackingList(newPackingList);
        } catch (error) {
            console.error('Error deleting item from DB:', error);
            setError('Error deleting item from DB');// setting the error message if any complications with the server appear
        }
    }

    // function to handle the input change of the edited item
    const handleEditedItemChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEditedItemText(e.target.value);
    }

    // providing the packing list context value
    const packingListContextValue: PackingListContextProps = {
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

    // providing the packing list context value to the components
    return (
        <PackingListContext.Provider value={packingListContextValue}>
            {children}
        </PackingListContext.Provider>
    )
}

export default PackingListContext;