import React from 'react';
import classes from './PlaceItem.module.css';
import VisitedBanner from '../VisitedBanner/VisitedBanner.tsx';
import {Place} from '../../types.ts';

const PlacesItem: React.FC<{ place: Place }> = ({place}) => {
    const isNature = place.type === "Nature";

    return (
        <article key={place.id}
                 className={`${classes.place} ${isNature ? classes.nature : classes.city}`}>
            <VisitedBanner date={place.date}/>
            <img src={place.imageUrl} alt={place.title}/>
            <div className={classes.placeInfo}>
                <h3>{place.title}</h3>
                <p>{place.country}</p>
            </div>
        </article>
    )
}
export default PlacesItem