import React, {useContext} from 'react';
import classes from './ContinentsContainer.module.css'
import PlacesList from '../PlacesList/PlacesList.tsx';
import {Place} from '../../types.ts';
import PlacesContext from '../../store/PlacesContext.tsx';

type GroupedPlaces = Record<string, Place[]> | undefined;

type PlacesArray = [string, Place[]][] | undefined;
const ContinentsContainer: React.FC = () => {
    const placesCtx = useContext(PlacesContext);
    const sortedPlaces = placesCtx?.places.sort((a, b) => a.continent.localeCompare(b.continent));
    const groupedPlaces:GroupedPlaces = sortedPlaces?.reduce((acc, place) => {
        const continent = place.continent;
        // If the continent hasn't been added to the accumulator, add it with an empty array

        // @ts-expect-error type string can't be used to index type {}
        if (!acc[continent]) {
            // @ts-expect-error type string can't be used to index type {}
            acc[continent] = [];
        }
        // Add the place to the appropriate continent array
        // @ts-expect-error type string can't be used to index type {}
        acc[continent].push(place);
        return acc;
    }, {});

    const placesArray:PlacesArray =groupedPlaces && Object.entries(groupedPlaces);
    return (
        <section className={classes.continentsContainer}>
            {placesArray && placesArray.map(([continent, places], index) => (
                <div className={classes.placesListDiv} key={index}>
                    <h2>{continent}</h2>
                    <PlacesList sortedPlaces={places}/>
                </div>
            ))}
        </section>
    )
}
export default ContinentsContainer