import React, {createContext, ReactNode} from 'react';
import { LoadScript } from '@react-google-maps/api';

export const GoogleMapsContext = createContext<boolean|null>(null);
export const GoogleMapsProvider: React.FC<{children: ReactNode}> = ({ children}) => {
    return (
        <LoadScript googleMapsApiKey="AIzaSyAkJEGW4P__lSJITHtP_jSJl542ean0QIQ">
            <GoogleMapsContext.Provider value={true}>
                {children}
            </GoogleMapsContext.Provider>
        </LoadScript>
    );
};