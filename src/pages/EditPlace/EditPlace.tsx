import React from 'react';
import {useParams} from 'react-router-dom';
import classes from './EditPlace.module.css'
import {DUMMY_PLACES} from '../../dummy_places.ts';
import {Place} from '../../types.ts';
import Error from '../Error.tsx';
import CompletePlaceItem from '../../components/CompletePlaceItem/CompletePlaceItem.tsx';

const EditPlace: React.FC = () => {
    const id: string | undefined = useParams().id;
    const place: Place | undefined = DUMMY_PLACES.find((place) => place.id === id);

    if (!place) return (
        <Error/>
    )

    return (
        <main className={place.type === "Nature" ? classes.natureBackground : classes.cityBackground}>
            <CompletePlaceItem place={place} />
        </main>
    )
}
export default EditPlace