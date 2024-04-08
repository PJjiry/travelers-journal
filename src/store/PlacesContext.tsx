import React, {createContext, ReactNode, useEffect, useState} from 'react';
import {Place, PlacesContextProps} from '../types.ts';
import {addPlace, editPlace, loadPlaces, deletePlace} from '../firebaseAPI.ts';

const PlacesContext = createContext<PlacesContextProps | null>(null);

export const PlacesProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [places, setPlaces] = useState<Place[]>([]);

    useEffect(() => {
        const loadPlacesFromDB = async () => {
            const placesFromDB = await loadPlaces();
            setPlaces(placesFromDB);
        };
        loadPlacesFromDB();
    }, []);

    const handleAddNewPlace = async (newPlace: Place) => {
        newPlace.id = newPlace.title.toLowerCase() + (Math.floor(Math.random() * 1000000)).toString();
        await addPlace(newPlace);
        setPlaces((prevState) => [...prevState, newPlace]);
    }

    const handleUpdatePlace = async (updatedPlace: Place) => {
        const id = updatedPlace.id;
        await editPlace(id, updatedPlace);
        setPlaces((prevState) => {
            const index = prevState.findIndex((place) => place.id === updatedPlace.id);
            const updatedPlaces = [...prevState];
            updatedPlaces[index] = updatedPlace;
            return updatedPlaces;
        });
    }

    const handleDeletePlace = async (placeId: string) => {
        await deletePlace(placeId);
        setPlaces((prevState) => {
            return prevState.filter((place) => place.id !== placeId);
        });
    }

    const placesContext:PlacesContextProps = {
        places,
        setPlaces,
        handleAddNewPlace,
        handleUpdatePlace,
        handleDeletePlace
    };

    return (
        <PlacesContext.Provider value={placesContext}>
            {children}
        </PlacesContext.Provider>
    );
};

export default PlacesContext