import React, {createContext, ReactNode, useCallback, useEffect, useState} from 'react';
import {Place, PlacesContextProps} from '../types.ts';
import {addPlace, editPlace, loadPlaces, deletePlace} from '../firebaseAPI.ts';
import {auth} from '../firebase.ts';
import {onAuthStateChanged, User} from 'firebase/auth';

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

        newPlace.id = newPlace.title.toLowerCase() + (Math.floor(Math.random() * 1000000)).toString(); // setting the id of the new place

        try {
            setLoading(true);
            await addPlace(auth.currentUser.uid, newPlace); // function to add the new place to the database
            setPlaces((prevState) => [...prevState, newPlace]); // setting the new place to the places
        } catch (error) {
            console.error('Error adding new place to DB:', error);
            setError('Error adding new place to DB') // setting the error message if any complications with the server appear
        } finally {
            setLoading(false);
        }
    }

    // function to handle updating a place
    const handleUpdatePlace = useCallback(async (updatedPlace: Place) => {
        if (!auth.currentUser) {
            return;
        }

        const id = updatedPlace.id; // getting the id of the updated place
        try {
            setLoading(true);
            await editPlace(auth.currentUser.uid, id, updatedPlace); // function to update the place in the database
            setPlaces((prevState) => {
                const updatedPlaces = prevState.map((place) =>
                    place.id === updatedPlace.id ? updatedPlace : place
                ); // map through the places and replace the updated place
                return updatedPlaces;
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