import React, {useContext} from 'react';
import classes from './Sights.module.css';
import {FaLandmarkFlag} from 'react-icons/fa6';
import CurrentPlaceContext from '../../store/CurrentPlaceContext.tsx';

// Component for displaying the sights of a city
const Sights: React.FC = () => {

    // Get the current place from the context
    const currentPlaceCtx = useContext(CurrentPlaceContext);
    const place = currentPlaceCtx?.currentPlace;

    if (!place) return null;

    // Render the sights of the city with name and description
    return (
        <>
            <h4 className={classes.sightsTitle}>Places of interest:</h4>
            {place.sights?.map((sight) => {
                return (
                    <div className={classes.sight} key={sight.sightName}>
                        <div>
                            <h5>{sight.sightName}</h5>
                            <FaLandmarkFlag/>
                        </div>
                        <p>{sight.sightDescription}</p>
                    </div>
                )
            })}
        </>
    )
}

export default Sights