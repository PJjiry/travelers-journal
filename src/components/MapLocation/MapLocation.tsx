import React, { useContext } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import classes from './MapLocation.module.css';
import { GoogleMapsContext } from '../../store/GoogleMapsContext';
import CurrentPlaceContext from '../../store/CurrentPlaceContext.tsx';

const MapLocation: React.FC = () => {
    const currentPlaceCtx = useContext(CurrentPlaceContext);
    const isGoogleMapsLoaded = useContext(GoogleMapsContext);
    const place = currentPlaceCtx?.currentPlace;

    if (!place) return null;

    return isGoogleMapsLoaded ? (
        <GoogleMap
            mapContainerStyle={{width: '100%', height: '400px', borderRadius: '0 0 10px 10px'}}
            center={{lat: place.location.lat, lng:place.location.lng}}
            zoom={10}
            options={{
                zoomControl: true,
                streetViewControl: false,
            }}
        >
            <Marker position={{lat: place.location.lat, lng: place.location.lng}}
                    draggable={false}/>
        </GoogleMap>
    ) : <div className={classes.loadingText}>Loading...</div>;
}
export default MapLocation