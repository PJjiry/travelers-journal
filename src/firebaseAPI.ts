import { doc, setDoc, getDocs, collection, updateDoc, deleteDoc } from "firebase/firestore";
import db from './firebase';
import {Place} from './types.ts';

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
// export const loadPackingListItems = async () => {
//     const snapshot = await db.collection('packingList').get();
//     return snapshot.docs.map(doc => doc.data());
// }
//
// // Add a packing list item
// export const addPackingListItem = async (item) => {
//     const docRef = await db.collection('packingList').add(item);
//     return docRef.id;
// }
//
// // Edit a packing list item
// export const editPackingListItem = async (id, updatedItem) => {
//     await db.collection('packingList').doc(id).update(updatedItem);
// }
//
// // Delete a packing list item
// export const deletePackingListItem = async (id) => {
//     await db.collection('packingList').doc(id).delete();
// }