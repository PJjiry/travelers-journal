import React from 'react';
import classes from './LocationForm.module.css';
import {MdHelpOutline} from 'react-icons/md';
import GoogleMapsContainer from '../GoogleMapsContainer/GoogleMapsContainer.tsx';

// Component for the location form with the map
const LocationForm: React.FC = () => {

    // Render the location form with the map and title
    return (
        <label htmlFor="location" className={`${classes.label} ${classes.location}`}>
            <div className={classes.locationTitle}>
                Location of the place:
                <MdHelpOutline
                    title="Set the location of the place on the map. The marker can be set as well. You can scroll and zoom the map as you wish to."
                    className={classes.icon}/>
            </div>
            <GoogleMapsContainer/>
        </label>
    )
}
export default LocationForm