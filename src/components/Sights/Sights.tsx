import React, {useContext} from 'react';
import classes from './Sights.module.css';
import {FaLandmarkFlag} from 'react-icons/fa6';
import CurrentPlaceContext from '../../store/CurrentPlaceContext.tsx';

const Sights:React.FC = () => {
    const currentPlaceCtx = useContext(CurrentPlaceContext);
    const place = currentPlaceCtx?.currentPlace;

    if (!place) return null;
    return(
        <>
            <h4 className={classes.sightsLabel}>Places of interest:</h4>
            {place.sights?.map((sight) => {
                return (
                    <div className={classes.sight} key={sight.sightName}>
                        <div><h5>{sight.sightName}</h5>
                            <FaLandmarkFlag/></div>
                        <p>{sight.sightDescription}</p>
                    </div>
                )
            })}</>
    )
}
export default Sights