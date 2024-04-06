import React, { useContext, useRef } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import classes from './MapLocation.module.css';
import { GoogleMapsContext } from '../../store/GoogleMapsContext';
import { MapLocationProps } from '../../types.ts';

const MapLocation: React.FC<MapLocationProps> = ({ lat, lng, onLocationChange, ...props }) => {
    const isGoogleMapsLoaded = useContext(GoogleMapsContext);
    const mapRef = useRef<google.maps.Map | null>(null);
    const lastChange = useRef<NodeJS.Timeout | null>(null);

    const handleLoad = (map: google.maps.Map) => {
        mapRef.current = map;
    };

    const handleCenterChanged = () => {
        if (lastChange.current) {
            clearTimeout(lastChange.current)
        }

        lastChange.current = setTimeout(() => {
            lastChange.current = null;
            if (mapRef.current) {
                const newCenter = mapRef.current.getCenter();
                if (newCenter!.lat() !== lat || newCenter!.lng() !== lng) {
                    onLocationChange && onLocationChange({
                        lat: newCenter!.lat(),
                        lng: newCenter!.lng(),
                    });
                }
            }
        }, 1000)
    };

    return isGoogleMapsLoaded ? (
        <GoogleMap
            mapContainerStyle={{width: '100%', height: '400px', borderRadius: '0 0 10px 10px'}}
            center={{lat: lat, lng: lng}}
            onLoad={handleLoad}
            onCenterChanged={handleCenterChanged}
            {...props}
            zoom={10}
            options={{
                zoomControl: true,
                streetViewControl: false,
            }}
        >
            <Marker position={{ lat: lat, lng: lng }}
                    draggable={false} />
        </GoogleMap>
    ) : <div className={classes.loadingText}>Loading...</div>;
}
export default MapLocation