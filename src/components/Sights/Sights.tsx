import React from 'react';
import classes from './Sights.module.css';
import {FaLandmarkFlag} from 'react-icons/fa6';
import {Place} from '../../types.ts';

const Sights:React.FC<{place:Place}> = ({place}) => {
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