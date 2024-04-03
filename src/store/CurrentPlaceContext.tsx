import React, { createContext, useState, ReactNode } from 'react';
import {CurrentPlaceContextProps, Place} from '../types.ts';

const CurrentPlaceContext = createContext<CurrentPlaceContextProps | null>(null);

export const CurrentPlaceProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [currentPlace, setCurrentPlace] = useState<Place | null>(null);

    return (
        <CurrentPlaceContext.Provider value={{ currentPlace, setCurrentPlace }}>
            {children}
        </CurrentPlaceContext.Provider>
    );
};

export default CurrentPlaceContext;