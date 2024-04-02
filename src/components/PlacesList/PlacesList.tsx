import React from 'react';
import classes from './PlacesList.module.css'
import {DUMMY_PLACES} from '../../dummy_places.ts';
import PlaceItem from '../PlaceItem/PlaceItem.tsx';

const PlacesList: React.FC = () => {
    return (
        <section className={classes.placesList}>
            {DUMMY_PLACES.map((place) => {
                return (
                    <PlaceItem key={place.id} place={place}/>
                )
            })}
        </section>
    )
}
export default PlacesList