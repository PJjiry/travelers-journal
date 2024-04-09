import React, {useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import classes from './EditPlace.module.css'
import {Place} from '../../types.ts';
import Error from '../Error/Error.tsx';
import FullPlaceItem from '../../components/FullPlaceItem/FullPlaceItem.tsx';
import PlacesContext from '../../store/PlacesContext.tsx';
import CurrentPlaceContext from '../../store/CurrentPlaceContext.tsx';

const EditPlace: React.FC = () => {
    const placesCtx = useContext(PlacesContext);
    const currentPlaceCtx = useContext(CurrentPlaceContext);
    const id: string | undefined = useParams().id;
    const place: Place | undefined = placesCtx?.places.find((place) => place.id === id);

    useEffect(() => {
        if (place) {
            currentPlaceCtx?.setCurrentPlace(place);
        }
    }, [place, currentPlaceCtx]);

    if (!place) return (
        <Error/>
    )

    return (
        <main className={place.type === "Nature" ? classes.natureBackground : classes.cityBackground}>
            <FullPlaceItem />
        </main>
    )
}
export default EditPlace