import React, {createContext, ReactNode, useCallback, useEffect, useState} from 'react';
import {Place, PlacesContextProps} from '../types.ts';
import {addPlace, deletePlace, editPlace, loadPlaces} from '../firebaseAPI.ts';
import {auth} from '../firebase.ts';
import {onAuthStateChanged, User} from 'firebase/auth';
import {readAndCompressImage} from 'browser-image-resizer';

// Context for the places...it provides the places and functions to manage them
const PlacesContext = createContext<PlacesContextProps | null>(null);

// Provider for the places context...it contains values and functions to manage the places
export const PlacesProvider: React.FC<{ children: ReactNode }> = ({children}) => {

    // using state to manage the places and set their initial value to an empty array
    const [places, setPlaces] = useState<Place[]>([]);

    // using state to manage the loading state of the places...mainly due to server requests
    const [loading, setLoading] = useState<boolean>(true);

    // using state to manage the error message...if any complications with the server appear
    const [error, setError] = useState<string | null>(null);

    // loading the places from the database when the component mounts and set them as a default state
    useEffect(() => {
        const loadPlacesFromDB = async (user: User | null) => {
            if (user) {
                try {
                    setLoading(true);
                    const placesFromDB = await loadPlaces(user.uid);
                    setPlaces(placesFromDB as Place[]);
                } catch (error) {
                    console.error('Error loading places from DB:', error);
                    setError('Error loading places from DB');
                } finally {
                    setLoading(false);
                }
            }
        }

        const unsubscribe = onAuthStateChanged(auth, user => {
            loadPlacesFromDB(user);
        });

        return () => {
            unsubscribe();
        }
    }, []);

    // function to handle adding a new place
    const handleAddNewPlace = async (newPlace: Place) => {
        if (!auth.currentUser) {
            return;
        }

        try {
            setLoading(true);

            // Fetch the image from the URL and convert it to a Blob
            const response = await fetch(newPlace.imageUrl);
            let imageBlob = await response.blob();

            // Compress the image Blob only if it's larger than 900 KB (that is Firebase's limit)
            if (imageBlob.size > 900 * 1024) {
                imageBlob = await readAndCompressImage(imageBlob as File);
                // Replace the image in newPlace with the compressed image
                newPlace.imageUrl = URL.createObjectURL(imageBlob);
            }

            const addedPlace = await addPlace(auth.currentUser.uid, newPlace); // function to add the new place to the database
            setPlaces((prevState) => [...prevState, addedPlace]); // setting the new place to the places
        } catch (error) {
            console.error('Error adding new place to DB:', error);
            setError('Error adding new place to DB. The image is too large. Try image with less quality.') // setting the error message if any complications with the server appear
        } finally {
            setLoading(false);
        }
    }

    // function to handle updating a place
    const handleUpdatePlace = useCallback(async (updatedPlace: Place) => {
        if (!auth.currentUser) {
            return;
        }

        try {
            setLoading(true);

            // Fetch the image from the URL and convert it to a Blob
            const response = await fetch(updatedPlace.imageUrl);
            let imageBlob = await response.blob();

            // Compress the image Blob only if it's larger than 900 KB (that is Firebase's limit)
            if (imageBlob.size > 900 * 1024) {
                imageBlob = await readAndCompressImage(imageBlob as File);
                // Replace the image in updatedPlace with the compressed image
                updatedPlace.imageUrl = URL.createObjectURL(imageBlob);
            }

            await editPlace(auth.currentUser.uid, updatedPlace.id, updatedPlace); // function to update the place in the database
            setPlaces((prevState) => {
                // map through the places and replace the updated place
                return prevState.map((place) =>
                    place.id === updatedPlace.id ? updatedPlace : place
                );
            });
        } catch (error) {
            console.error('Error updating the place in DB:', error);
            setError('Error updating the place in DB'); // setting the error message if any complications with the server appear
        } finally {
            setLoading(false);
        }
    }, []);

    // function to handle deleting a place
    const handleDeletePlace = async (placeId: string) => {
        if (!auth.currentUser) {
            return;
        }

        try {
            setLoading(true);
            await deletePlace(auth.currentUser.uid, placeId); // function to delete the place from the database
            setPlaces((prevState) => {
                return prevState.filter((place) => place.id !== placeId); // filtering out the deleted place
            });
        } catch (error) {
            console.error('Error deleting the place from DB:', error);
            setError('Error deleting the place from DB'); // setting the error message if any complications with the server appear
        } finally {
            setLoading(false);
        }
    }

    // values and functions provided by the context
    const placesContext: PlacesContextProps = {
        places,
        setPlaces,
        handleAddNewPlace,
        handleUpdatePlace,
        handleDeletePlace,
        loading,
        error
    };

    // providing the context to the children
    return (
        <PlacesContext.Provider value={placesContext}>
            {children}
        </PlacesContext.Provider>
    );
};

export default PlacesContext