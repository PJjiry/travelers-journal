import React from 'react';
import classes from './PlacesList.module.css'
import PlaceItem from '../PlaceItem/PlaceItem.tsx';
import {Place} from '../../types.ts';

const PlacesList: React.FC<{places: Place[]}> = ({places}) => {
    return (
        <section className={classes.placesList}>
            {places && places.map((place) => {
                return (
                    <PlaceItem key={place.id} place={place}/>
                )
            })}
        </section>
    )
}
export default PlacesList