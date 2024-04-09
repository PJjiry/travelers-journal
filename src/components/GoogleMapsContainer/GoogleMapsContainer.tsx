import React, {useContext, useRef, useState, useEffect, useCallback} from 'react';
import {GoogleMap, Marker} from '@react-google-maps/api';
import classes from './GoogleMapsContainer.module.css';
import {GoogleMapsContext} from '../../store/GoogleMapsContext';
import {GoogleMapsContainerProps} from '../../types.ts';
import PlaceFormContext from '../../store/PlaceFormContext.tsx';

// Component that displays Google Maps with the location marker
const GoogleMapsContainer: React.FC<GoogleMapsContainerProps> = ({place}) => {

    // importing the place form context to use its state and functions
    const placeFormCtx = useContext(PlaceFormContext);

    // using the context to check if the Google Maps script is loaded
    const isGoogleMapsLoaded = useContext(GoogleMapsContext);

    // using refs to store the map and marker
    const mapRef = useRef<google.maps.Map | null>(null);
    const markerRef = useRef<google.maps.Marker | null>(null);

    // using timeout to handle change of the center of the map
    const lastChange = useRef<NodeJS.Timeout | null>(null);

    // using state to show the marker after a delay (otherwise it would not be shown)
    const [showMarker, setShowMarker] = useState(false);

    // function to handle the loading of the map
    const handleLoadMap = (map: google.maps.Map) => {
        mapRef.current = map;
    };

    // function to handle the loading of the marker
    const handleLoadMarker = (marker: google.maps.Marker) => {
        markerRef.current = marker;
    };

    // function to handle the change of the center of the map after a delay
    const handleCenterChanged = useCallback(() => {
        if (lastChange.current) {
            clearTimeout(lastChange.current)
        }

        lastChange.current = setTimeout(() => {
            lastChange.current = null;
            if (mapRef.current) {
                const newCenter = mapRef.current.getCenter(); // Get the new center of the map
                if (newCenter!.lat() !== placeFormCtx?.placeForm.location.lat || newCenter!.lng() !== placeFormCtx?.placeForm.location.lng) { // Check if the new center is different from the current location
                    placeFormCtx?.handleLocationChange && placeFormCtx?.handleLocationChange({
                        lat: newCenter!.lat(), // Update the location in the form
                        lng: newCenter!.lng(),
                    });
                }
            }
        }, 1000)
    }, [placeFormCtx, mapRef, lastChange]);

    // function to handle the click on the map...it sets the new marker position
    const handleClick = useCallback((e: google.maps.MapMouseEvent) => {
        if (!e.latLng) {
            return;
        }
        const newMarkerPos = {lat: e.latLng.lat(), lng: e.latLng.lng()};
        placeFormCtx?.handleMarkerPositionChange(newMarkerPos); // Update the marker position in the form
    }, [placeFormCtx]);

    // using effect to show the marker after a delay
    useEffect(() => {
        if (isGoogleMapsLoaded) {
            const timer = setTimeout(() => {
                setShowMarker(true);
            }, 1500); // Delay of 1.5 second to show the marker

            return () => clearTimeout(timer);
        }
    }, [isGoogleMapsLoaded]);

    // using effect to update the position of the marker and the center of the map if the place changes
    useEffect(() => {
        if (place) {
            if (markerRef.current) {
                markerRef.current.setPosition(place.markerPosition);
            }
            if (mapRef.current) {
                mapRef.current.setCenter(place.location);
            }
        }
    }, [place]);

    // Render the Google Map with the location marker if the Google Maps script is loaded
    return isGoogleMapsLoaded ? (
        <GoogleMap
            mapContainerStyle={{width: '100%', height: '400px', borderRadius: '10px'}}
            center={place ? place.location : (placeFormCtx?.placeForm.location || {lat: 50.073658, lng: 14.418540})}
            onLoad={handleLoadMap}
            onCenterChanged={handleCenterChanged}
            onClick={handleClick}
            zoom={12}
            options={{
                zoomControl: true,
                streetViewControl: false,
            }}
        >
            {showMarker && <Marker onLoad={handleLoadMarker}
                                   position={place ? place.markerPosition : placeFormCtx?.placeForm.markerPosition || {
                                       lat: 50.073658,
                                       lng: 14.418540
                                   }}/>}
        </GoogleMap>
    ) : <div className={classes.loadingText}>Loading...</div>;
}
export default GoogleMapsContainer