import React, { useContext, useRef, useState, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import classes from './MapLocation.module.css';
import { GoogleMapsContext } from '../../store/GoogleMapsContext';
import { MapLocationProps } from '../../types.ts';
import PlaceFormContext from '../../store/PlaceFormContext.tsx';

const MapLocation: React.FC<MapLocationProps> = ({  place}) => {
    const PlaceFormCtx = useContext(PlaceFormContext);
    const isGoogleMapsLoaded = useContext(GoogleMapsContext);
    const mapRef = useRef<google.maps.Map | null>(null);
    const markerRef = useRef<google.maps.Marker | null>(null);
    const lastChange = useRef<NodeJS.Timeout | null>(null);
    const [showMarker, setShowMarker] = useState(false);

    const handleLoadMap = (map: google.maps.Map) => {
        mapRef.current = map;
    };

    const handleLoadMarker = (marker: google.maps.Marker) => {
        markerRef.current = marker;
    };

    const handleCenterChanged = () => {
        if (lastChange.current) {
            clearTimeout(lastChange.current)
        }

        lastChange.current = setTimeout(() => {
            lastChange.current = null;
            if (mapRef.current) {
                const newCenter = mapRef.current.getCenter();
                if (newCenter!.lat() !== PlaceFormCtx?.placeForm.location.lat || newCenter!.lng() !== PlaceFormCtx?.placeForm.location.lng) {
                    PlaceFormCtx?.handleLocationChange && PlaceFormCtx?.handleLocationChange({
                        lat: newCenter!.lat(),
                        lng: newCenter!.lng(),
                    });
                }
            }
        }, 1000)
    };

    useEffect(() => {
        if (isGoogleMapsLoaded) {
            const timer = setTimeout(() => {
                setShowMarker(true);
            }, 1500); // Delay of 1.5 second to show the marker

            return () => clearTimeout(timer);
        }
    }, [isGoogleMapsLoaded]);

    useEffect(() => {
        if (place) {
           if(markerRef.current){
                markerRef.current.setPosition(place.markerPosition);
           }
            if (mapRef.current) {
                mapRef.current.setCenter(place.location);
            }
        }
    }, [place]);



    const handleClick = (e: google.maps.MapMouseEvent) => {
        if(!e.latLng){
            return;
        }
        const newMarkerPos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        PlaceFormCtx?.handleMarkerPositionChange(newMarkerPos);
    };

    return isGoogleMapsLoaded ? (
        <GoogleMap
            mapContainerStyle={{width: '100%', height: '400px', borderRadius: '10px'}}
            center={place ? place.location : (PlaceFormCtx?.placeForm.location || {lat: 50.073658, lng: 14.418540})}
            onLoad={handleLoadMap}
            onCenterChanged={handleCenterChanged}
            onClick={handleClick}
            zoom={12}
            options={{
                zoomControl: true,
                streetViewControl: false,
            }}
        >
            {showMarker && <Marker onLoad={handleLoadMarker} position={place ? place.markerPosition : PlaceFormCtx?.placeForm.markerPosition || {lat: 50.073658, lng: 14.418540}} />}
        </GoogleMap>
    ) : <div className={classes.loadingText}>Loading...</div>;
}
export default MapLocation