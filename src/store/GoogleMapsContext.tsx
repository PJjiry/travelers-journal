import React, {createContext, ReactNode} from 'react';
import {LoadScript} from '@react-google-maps/api';

// Context for the Google Maps script...it provides a boolean value to check if the script is loaded
export const GoogleMapsContext = createContext<boolean | null>(null);

// Provider for the Google Maps context...it provides the boolean value to check if the script is loaded and ensures that the script is loaded just once
export const GoogleMapsProvider: React.FC<{ children: ReactNode }> = ({children}) => {

    // providing the boolean value to check if the script is loaded...script is loaded just once
    return (
        <LoadScript googleMapsApiKey="AIzaSyAkJEGW4P__lSJITHtP_jSJl542ean0QIQ">
            <GoogleMapsContext.Provider value={true}>
                {children}
            </GoogleMapsContext.Provider>
        </LoadScript>
    );
};