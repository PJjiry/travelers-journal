import React, {createContext, useState, ReactNode} from 'react';
import {CurrentPlaceContextProps, Place} from '../types.ts';

// Context for the current place distinguished by url and id
const CurrentPlaceContext = createContext<CurrentPlaceContextProps | null>(null);

// Provider for the current place context...it provides the current place and a function to set it
export const CurrentPlaceProvider: React.FC<{ children: ReactNode }> = ({children}) => {

    // using state to manage the current place
    const [currentPlace, setCurrentPlace] = useState<Place | null>(null);

    // providing the current place and the function to set it
    return (
        <CurrentPlaceContext.Provider value={{currentPlace, setCurrentPlace}}>
            {children}
        </CurrentPlaceContext.Provider>
    );
};

export default CurrentPlaceContext;