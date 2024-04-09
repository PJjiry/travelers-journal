import React from 'react';
import classes from './PlaceItem.module.css';
import VisitedBanner from '../VisitedBanner/VisitedBanner.tsx';
import {Place} from '../../types.ts';
import {Link} from 'react-router-dom';

// Component for displaying the place item with just the title, image, country, and visited banner
const PlacesItem: React.FC<{ place: Place }> = ({place}) => {

    // Check if the place type is city or nature
    const isNature = place.type === "Nature";

    // Render the place item with the title, image, country, and visited banner
    return (
        <Link className={classes.placeLink} to={`/edit-place/${place.id}`}>
            <article key={place.id}
                     className={`${classes.place} ${isNature ? classes.nature : classes.city}`}>
                <VisitedBanner date={place.date}/>
                <img src={place.imageUrl} alt={place.title}/>
                <div className={classes.placeInfo}>
                    <h3>{place.title}</h3>
                    <p>{place.country}</p>
                </div>
            </article>
        </Link>
    )
}

export default PlacesItem