import React, {useContext, useEffect, useMemo} from 'react';
import {useParams} from 'react-router-dom';
import classes from './EditPlace.module.css'
import {Place} from '../../types.ts';
import Error from '../Error/Error.tsx';
import FullPlaceItem from '../../components/FullPlaceItem/FullPlaceItem.tsx';
import PlacesContext from '../../store/PlacesContext.tsx';
import CurrentPlaceContext from '../../store/CurrentPlaceContext.tsx';

// Component for editing a place item, it displays the item with all its details and enables editing and deleting the item
const EditPlace: React.FC = () => {

    // importing the places and current place context to use their state and functions
    const placesCtx = useContext(PlacesContext);
    const currentPlaceCtx = useContext(CurrentPlaceContext);

    // getting the id of the place from the URL
    const id: string | undefined = useParams().id;

    // finding the place with the id
    const place: Place | undefined = useMemo(() => {
        return placesCtx?.places.find((place) => place.id === id);
    }, [placesCtx, id]);

    // using effect to set the current place in the context
    useEffect(() => {
        if (place) {
            currentPlaceCtx?.setCurrentPlace(place);
        }
    }, [place, currentPlaceCtx]);

    // if there is no place with the id, display an error message
    if (!place) return (
        <Error/>
    )

    // render the full place item with all its details and background according to the type of the place
    return (
        <main className={place.type === "Nature" ? classes.natureBackground : classes.cityBackground}>
            <FullPlaceItem/>
        </main>
    )
}

export default EditPlace