import React, {createContext, ReactNode, useEffect, useState} from 'react';
import {Place, PlacesContextProps} from '../types.ts';
import {addPlace, editPlace, loadPlaces, deletePlace} from '../firebaseAPI.ts';

const PlacesContext = createContext<PlacesContextProps | null>(null);

export const PlacesProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [places, setPlaces] = useState<Place[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPlacesFromDB = async () => {
            try {
                setLoading(true);
                const placesFromDB = await loadPlaces();
                setPlaces(placesFromDB);
            } catch (error) {
                console.error('Error loading places from DB:', error);
                setError('Error loading places from DB');
            } finally {
                setLoading(false);
            }
        }
        loadPlacesFromDB()
    }, []);

    const handleAddNewPlace = async (newPlace: Place) => {
        newPlace.id = newPlace.title.toLowerCase() + (Math.floor(Math.random() * 1000000)).toString();
        try {
            setLoading(true);
            await addPlace(newPlace);
            setPlaces((prevState) => [...prevState, newPlace]);
        } catch (error) {
            console.error('Error adding new place to DB:', error);
            setError('Error adding new place to DB')
        } finally {
            setLoading(false);
        }
    }

    const handleUpdatePlace = async (updatedPlace: Place) => {
        const id = updatedPlace.id;
        try {
            setLoading(true);
            await editPlace(id, updatedPlace);
            setPlaces((prevState) => {
                const index = prevState.findIndex((place) => place.id === updatedPlace.id);
                const updatedPlaces = [...prevState];
                updatedPlaces[index] = updatedPlace;
                return updatedPlaces;
            });
        } catch (error) {
            console.error('Error updating the place in DB:', error);
            setError('Error updating the place in DB');
        } finally {
            setLoading(false);
        }
    }

    const handleDeletePlace = async (placeId: string) => {
        try {
            setLoading(true);
            await deletePlace(placeId);
            setPlaces((prevState) => {
                return prevState.filter((place) => place.id !== placeId);
            });
        } catch (error) {
            console.error('Error deleting the place from DB:', error);
            setError('Error deleting the place from DB');
        } finally {
            setLoading(false);
        }
    }

    const placesContext: PlacesContextProps = {
        places,
        setPlaces,
        handleAddNewPlace,
        handleUpdatePlace,
        handleDeletePlace,
        loading,
        error
    };

    return (
        <PlacesContext.Provider value={placesContext}>
            {children}
        </PlacesContext.Provider>
    );
};

export default PlacesContext