import React, {useContext} from 'react';
import classes from './PlaceInfo.module.css';
import {differenceInDays, format} from 'date-fns';
import {isPastDate} from '../../utils/utils.ts';
import {PiConfettiFill} from 'react-icons/pi';
import {MdCardTravel} from 'react-icons/md';
import {IoEarth} from 'react-icons/io5';
import PlaceInfoWrapper from '../PlaceInfoWrapper/PlaceInfoWrapper.tsx';
import Sights from '../Sights/Sights.tsx';
import CurrentPlaceContext from '../../store/CurrentPlaceContext.tsx';

const PlaceInfo: React.FC = () => {
    const currentPlaceCtx = useContext(CurrentPlaceContext);
    const place = currentPlaceCtx?.currentPlace;

    if (!place) return null;
    return (
        <div className={classes.placeInfo}>
            <h3>{place.title}</h3>
            <PlaceInfoWrapper
                label="Date of visit:">{format(new Date(place.date), 'MMMM do, yyyy')} ({isPastDate(place.date) ? <>Already
                visited <PiConfettiFill/></> : <>Coming
                in {differenceInDays(new Date(place.date), new Date())} days <MdCardTravel/></>})</PlaceInfoWrapper>
            <PlaceInfoWrapper label="Country:">{place.country} ({place.continent} <IoEarth/>)</PlaceInfoWrapper>
            {isPastDate(place.date) && place.budget &&
                <PlaceInfoWrapper label="Budget:">{new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                }).format(place.budget)}</PlaceInfoWrapper>}
            <PlaceInfoWrapper label="Description:">{place.description}</PlaceInfoWrapper>
            {place.specialRequirements &&
                <PlaceInfoWrapper label="Special requirements:">{place.specialRequirements}</PlaceInfoWrapper>}
            {place.type === "City" && (place.sights?.length ?? 0) > 0 && <Sights/>}
        </div>
    )
}
export default PlaceInfo