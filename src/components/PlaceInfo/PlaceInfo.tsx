import React, {memo, useMemo} from 'react';
import classes from './PlaceInfo.module.css';
import {differenceInDays, format} from 'date-fns';
import {isPastDate} from '../../utils/utils.ts';
import {PiConfettiFill} from 'react-icons/pi';
import {MdCardTravel} from 'react-icons/md';
import {IoEarth} from 'react-icons/io5';
import PlaceInfoWrapper from '../PlaceInfoWrapper/PlaceInfoWrapper.tsx';
import Sights from '../Sights/Sights.tsx';
import {Place} from '../../types.ts';

// Component for displaying the place information
const PlaceInfo: React.FC<{ place: Place }> = memo(({place}) => {

    // Format the date of the place
    const formattedDate = useMemo(() => format(new Date(place.date), 'MMMM do, yyyy'), [place.date]);

    // Format the budget of the place if it is in the past and has a budget set, add the currency symbol.
    const formattedBudget = useMemo(() => {
        if (isPastDate(place.date) && place.budget !== null && place.budget !== undefined && place.budget > 0) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: place.currency
            }).format(place.budget);
        }
        return null;
    }, [place.date, place.budget, place.currency]);

    // Render the place information: title, date, country, continent, budget, description, special requirements, and sights
    return (
        <div className={classes.placeInfo}>
            <h3>{place.title}</h3>
            {/*Display formatted day and if the place has been visited or not yet.*/}
            <PlaceInfoWrapper
                label="Date of visit:">{formattedDate} ({isPastDate(place.date) ? <>Already
                visited <PiConfettiFill/></> : <>Coming
                in {differenceInDays(new Date(place.date), new Date())} days <MdCardTravel/></>})</PlaceInfoWrapper>
            <PlaceInfoWrapper label="Country:">{place.country} ({place.continent} <IoEarth/>)</PlaceInfoWrapper>
            {/*Display the budget only if it set to number greater than zero.*/}
            {formattedBudget && <PlaceInfoWrapper label="Budget:">{formattedBudget}</PlaceInfoWrapper>}
            <PlaceInfoWrapper label="Description:">{place.description}</PlaceInfoWrapper>
            {/*Display special requirements only if they are defined.*/}
            {place.specialRequirements &&
                <PlaceInfoWrapper label="Special requirements:">{place.specialRequirements}</PlaceInfoWrapper>}
            {/*If the place type is city and there are some sights display them.*/}
            {place.type === "City" && (place.sights?.length ?? 0) > 0 && <Sights/>}
        </div>
    )
})

export default PlaceInfo