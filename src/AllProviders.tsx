import {PlacesProvider} from './store/PlacesContext.tsx';
import {PlaceFormProvider} from './store/PlaceFormContext.tsx';
import {CurrentPlaceProvider} from './store/CurrentPlaceContext.tsx';
import {GoogleMapsProvider} from './store/GoogleMapsContext.tsx';
import {PackingListProvider} from './store/PackingListContext.tsx';
import React, {ReactNode} from 'react';

const AllProviders: React.FC<{ children: ReactNode }> = ({children}) => {
    return (
        <PlacesProvider> {/* Provide the places context*/}
            <PlaceFormProvider> {/* Provide the place form context*/}
                <CurrentPlaceProvider> {/* Provide the current place context*/}
                    <GoogleMapsProvider> {/* Provide the Google Maps context*/}
                        <PackingListProvider> {/* Provide the packing list context*/}
                            {children}
                        </PackingListProvider>
                    </GoogleMapsProvider>
                </CurrentPlaceProvider>
            </PlaceFormProvider>
        </PlacesProvider>
    )
}

export default AllProviders