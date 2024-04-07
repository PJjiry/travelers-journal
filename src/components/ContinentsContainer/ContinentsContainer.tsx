import React from 'react';
import classes from './ContinentsContainer.module.css'
import PlacesList from '../PlacesList/PlacesList.tsx';
import {Place} from '../../types.ts';

type GroupedPlaces = Record<string, Place[]> | undefined;

type PlacesArray = [string, Place[]][] | undefined;
const ContinentsContainer: React.FC<{searchedPlaces:Place[]}> = ({searchedPlaces}) => {
    if(searchedPlaces.length===0) {
        return <h3 className={classes.noResult} >No places found.</h3>
    }

    const sortedPlaces = searchedPlaces?.sort((a, b) => a.continent.localeCompare(b.continent));
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