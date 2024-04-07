import React from 'react';
import classes from './LocationForm.module.css';
import {MdHelpOutline} from 'react-icons/md';
import MapLocation from '../MapLocation/MapLocation.tsx';
import {LocationFormProps} from '../../types.ts';

const LocationForm: React.FC<LocationFormProps> = ({location, onLocationChange}) => {
    return (
        <label htmlFor="location" className={`${classes.label} ${classes.location}`}>
            <div className={classes.locationTitle}>
                Location of the place:
                <MdHelpOutline
                    title="Set the location on the map of the place. You can scroll and zoom the map as you wish to."
                    className={classes.icon}/>
            </div>
            <MapLocation lat={location.lat} lng={location.lng}
                         onLocationChange={(newLocation) => onLocationChange(newLocation)}
            />
        </label>
    )
}
export default LocationForm