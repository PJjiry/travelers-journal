import React, { useContext } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import classes from './MapLocation.module.css';
import { GoogleMapsContext } from '../../store/GoogleMapsContext';

const MapLocation: React.FC<{ lat: number, lng: number }> = ({lat, lng}) => {
    const isGoogleMapsLoaded = useContext(GoogleMapsContext);

    return isGoogleMapsLoaded ? (
        <GoogleMap
            mapContainerStyle={{width: '100%', height: '400px', borderRadius: '0 0 10px 10px'}}
            center={{lat: lat, lng: lng}}
            zoom={10}
            options={{
                zoomControl: true,
                streetViewControl: false,
            }}
        >
            <Marker position={{lat: lat, lng: lng}}
                    draggable={false}/>
        </GoogleMap>
    ) : <div className={classes.loadingText}>Loading...</div>;
}
export default MapLocation