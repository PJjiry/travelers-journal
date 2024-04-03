import React from 'react';
import classes from './CompletePlaceItem.module.css';
import {Place} from '../../types.ts';
import PlaceInfo from '../PlaceInfo/PlaceInfo.tsx';
import MapLocation from '../MapLocation/MapLocation.tsx';

const CompletePlaceItem: React.FC<{ place: Place }> = ({place}) => {
    return (
        <article key={place.id} className={classes.place}>
            <img src={place.imageUrl} alt={place.title}/>
            <PlaceInfo place={place}/>
            <div className={classes.map}>
                <h4>Location:</h4>
                <MapLocation lat={place.location.lat} lng={place.location.lng}/>
                </div>
        </article>
)
}
export default CompletePlaceItem