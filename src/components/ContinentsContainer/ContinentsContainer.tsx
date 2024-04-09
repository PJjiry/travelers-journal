import React from 'react';
import classes from './ContinentsContainer.module.css'
import PlacesList from '../PlacesList/PlacesList.tsx';
import {GroupedPlaces, Place, PlacesArray} from '../../types.ts';

// Component for displaying the places grouped by continents
const ContinentsContainer: React.FC<{ searchedPlaces: Place[] }> = ({searchedPlaces}) => {

    // If there are no places found, display a message
    if (searchedPlaces.length === 0) {
        return <h3 className={classes.noResult}>No places found.</h3>
    }

    // Sort the places by continent
    const sortedPlaces = searchedPlaces?.sort((a, b) => a.continent.localeCompare(b.continent));

    // The places with the same continent are grouped together
    const groupedPlaces: GroupedPlaces = sortedPlaces?.reduce((placesByContinent, place) => {
        const continent = place.continent;

        // If the continent hasn't been added to the array, add it with an empty array
        // @ts-expect-error type string can't be used to index type {}
        if (!placesByContinent[continent]) {
            // @ts-expect-error type string can't be used to index type {}
            placesByContinent[continent] = [];
        }
        // Add the place to the appropriate continent array
        // @ts-expect-error type string can't be used to index type {}
        placesByContinent[continent].push(place);
        return placesByContinent;
    }, {});

    // Convert the object with grouped places to an array
    const placesArray: PlacesArray = groupedPlaces && Object.entries(groupedPlaces);

    // Display the continents and the places in each continent
    return (
        <section className={classes.continentsContainer}>
            {placesArray && placesArray.map(([continent, places], index) => (
                <div className={classes.continentWrapper} key={index}>
                    <h2>{continent}</h2>
                    <PlacesList sortedPlaces={places}/>
                </div>
            ))}
        </section>
    )
}
export default ContinentsContainer