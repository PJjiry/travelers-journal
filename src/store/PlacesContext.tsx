import React, {createContext, ReactNode, useState} from 'react';
import {Place, PlacesContextProps} from '../types.ts';
import {DUMMY_PLACES} from '../dummy_places.ts';

const PlacesContext = createContext<PlacesContextProps | null>(null);

export const PlacesProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [places, setPlaces] = useState<Place[]>(DUMMY_PLACES);


    const addNewPlace = (newPlace: Place) => {
        newPlace.id = newPlace.title.toLowerCase() + (Math.floor(Math.random() * 1000000)).toString();
        setPlaces((prevState) => [...prevState, newPlace]);
    }

    const updatePlace = (updatedPlace: Place) => {
        setPlaces((prevState) => {
            const index = prevState.findIndex((place) => place.id === updatedPlace.id);
            const updatedPlaces = [...prevState];
            updatedPlaces[index] = updatedPlace;
            return updatedPlaces;
        });
    }

    const deletePlace = (placeId: string) => {
        setPlaces((prevState) => {
            return prevState.filter((place) => place.id !== placeId);
        });
    }

    const placesContext:PlacesContextProps = {
        places,
        setPlaces,
        addNewPlace,
        updatePlace,
        deletePlace
    };

    return (
        <PlacesContext.Provider value={placesContext}>
            {children}
        </PlacesContext.Provider>
    );
};

export default PlacesContext