import { doc, setDoc, getDocs, collection, updateDoc, deleteDoc } from "firebase/firestore";
import db from './firebase';
import {PackingListItem, Place} from './types.ts';

// Load places
export const loadPlaces = async (): Promise<Place[]> => {
    const querySnapshot = await getDocs(collection(db, "places"));
    return querySnapshot.docs.map(doc => doc.data() as Place);
}

// Add a place
export const addPlace = async (place: Place): Promise<void> => {
    await setDoc(doc(db, "places", place.id), place);
}

// Edit a place
export const editPlace = async (id: string, updatedPlace: Partial<Place>): Promise<void> => {
    const placeRef = doc(db, "places", id);
    await updateDoc(placeRef, updatedPlace);
}

// Delete a place
export const deletePlace = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, "places", id));
}

// Load packing list items
export const loadPackingListItems = async (): Promise<PackingListItem[]> => {
    const querySnapshot = await getDocs(collection(db, "packingList"));
    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as PackingListItem));
}

// Add a packing list item
export const addPackingListItem = async (item: Omit<PackingListItem, 'id'>): Promise<string> => {
    const docRef = doc(collection(db, "packingList"), item.name);
    await setDoc(docRef, item);
    return docRef.id;
}

// Edit a packing list item
export const editPackingListItem = async (id: string, updatedItem: Partial<PackingListItem>): Promise<void> => {
    const itemRef = doc(db, "packingList", id);
    await updateDoc(itemRef, updatedItem);
}

// Delete a packing list item
export const deletePackingListItem = async (id: string): Promise<void> => {
    const itemRef = doc(db, "packingList", id);
    await deleteDoc(itemRef);
}