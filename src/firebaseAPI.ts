import {doc, setDoc, getDocs, collection, updateDoc, deleteDoc} from "firebase/firestore";
import db from './firebase';
import {PackingListItem, Place} from './types.ts';

// function to load places from the database
export const loadPlaces = async (): Promise<Place[]> => {
    const querySnapshot = await getDocs(collection(db, "places"));
    return querySnapshot.docs.map(doc => doc.data() as Place);
}

// function to add a place to the database
export const addPlace = async (place: Place): Promise<void> => {
    await setDoc(doc(db, "places", place.id), place);
}

// function to edit a place in the database
export const editPlace = async (id: string, updatedPlace: Partial<Place>): Promise<void> => {
    const placeRef = doc(db, "places", id);
    await updateDoc(placeRef, updatedPlace);
}

// function to delete a place from the database
export const deletePlace = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, "places", id));
}

// function to load packing list items from the database
export const loadPackingListItems = async (): Promise<PackingListItem[]> => {
    const querySnapshot = await getDocs(collection(db, "packingList"));
    return querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id} as PackingListItem));
}

// function to add a packing list item to the database
export const addPackingListItem = async (item: Omit<PackingListItem, 'id'>): Promise<string> => {
    const docRef = doc(collection(db, "packingList"), item.name);
    await setDoc(docRef, item);
    return docRef.id;
}

// function to edit a packing list item
export const editPackingListItem = async (id: string, updatedItem: Partial<PackingListItem>): Promise<void> => {
    const itemRef = doc(db, "packingList", id);
    await updateDoc(itemRef, updatedItem);
}

// function to delete a packing list item
export const deletePackingListItem = async (id: string): Promise<void> => {
    const itemRef = doc(db, "packingList", id);
    await deleteDoc(itemRef);
}