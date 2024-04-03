import React, {createContext, ReactNode, useState} from 'react';
import {Place, PlacesContextProps} from '../types.ts';
import {DUMMY_PLACES} from '../dummy_places.ts';

const PlacesContext = createContext<PlacesContextProps | null>(null);

export const PlacesProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [places, setPlaces] = useState<Place[]>(DUMMY_PLACES);

    const placesContext:PlacesContextProps = {
        places,
        setPlaces
    };

    return (
        <PlacesContext.Provider value={placesContext}>
            {children}
        </PlacesContext.Provider>
    );
};

export default PlacesContext