import React, {memo} from 'react';
import classes from './PlacesList.module.css'
import PlaceItem from '../PlaceItem/PlaceItem.tsx';
import {Place} from '../../types.ts';

// Component for displaying the list of places in the main page
const PlacesList: React.FC<{ sortedPlaces: Place[] }> = memo(({sortedPlaces}) => {

    // Render the list of sorted places
    return (
        <section className={classes.placesList}>
            {sortedPlaces && sortedPlaces.map((place) => {
                return (
                    <PlaceItem key={place.id} place={place}/>
                )
            })}
        </section>
    )
})

export default PlacesList