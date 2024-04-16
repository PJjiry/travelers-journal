import {doc, addDoc, setDoc, getDocs, collection, deleteDoc} from "firebase/firestore";
import db from './firebase';
import {PackingListItem, Place} from './types.ts';

// Function to load all places for a specific user
export const loadPlaces = async (userId: string) => {
    const userRef = doc(db, 'users', userId);
    const placesRef = collection(userRef, 'places');
    const placeDocs = await getDocs(placesRef);
    return placeDocs.docs.map(doc => ({...doc.data(), id: doc.id}));
};

// Function to add a new place for a specific user
export const addPlace = async (userId: string, newPlace: Place) => {
    const userRef = doc(db, 'users', userId);
    const placesRef = collection(userRef, 'places');
    const placeDoc = await addDoc(placesRef, newPlace);
    return placeDoc.id;
};

// Function to edit a place for a specific user
export const editPlace = async (userId: string, placeId: string, updatedPlace: Place) => {
    const placeRef = doc(db, 'users', userId, 'places', placeId);
    await setDoc(placeRef, updatedPlace, {merge: true});
};

// Function to delete a place for a specific user
export const deletePlace = async (userId: string, placeId: string) => {
    const placeRef = doc(db, 'users', userId, 'places', placeId);
    await deleteDoc(placeRef);
};

// Function to load all packing list items for a specific user
export const loadPackingListItems = async (userId: string) => {
    const userRef = doc(db, 'users', userId);
    const packingListRef = collection(userRef, 'packingList');
    const packingListDocs = await getDocs(packingListRef);
    return packingListDocs.docs.map(doc => ({...doc.data(), id: doc.id}));
};

// Function to add a new packing list item for a specific user
export const addPackingListItem = async (userId: string, newItem: PackingListItem) => {
    const userRef = doc(db, 'users', userId);
    const packingListRef = collection(userRef, 'packingList');
    const packingListItemDoc = await addDoc(packingListRef, newItem);
    return packingListItemDoc.id;
};

// Function to edit a packing list item for a specific user
export const editPackingListItem = async (userId: string, itemId: string, updatedItem: PackingListItem) => {
    const itemRef = doc(db, 'users', userId, 'packingList', itemId);
    await setDoc(itemRef, updatedItem, {merge: true});
};

// Function to delete a packing list item for a specific user
export const deletePackingListItem = async (userId: string, itemId: string) => {
    const itemRef = doc(db, 'users', userId, 'packingList', itemId);
    await deleteDoc(itemRef);
};