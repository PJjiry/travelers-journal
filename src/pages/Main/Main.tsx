import React, {useCallback, useContext, useMemo, useState} from 'react';
import classes from './Main.module.css'
import SearchBar from '../../components/SearchBar/SearchBar.tsx';
import ContinentsContainer from '../../components/ContinentsContainer/ContinentsContainer.tsx';
import PlacesContext from '../../store/PlacesContext.tsx';
import {Link} from 'react-router-dom';

// Main page component...it displays the search bar and the continents container
const Main: React.FC = () => {

    // importing the places context to use its state
    const placesCtx = useContext(PlacesContext);

    // using state to store the search value
    const [searchValue, setSearchValue] = useState<string>('');

    // filtering the places according to the search value...it searches for the place title or country
    const searchedPlaces = useMemo(() => {
        return placesCtx?.places.filter((place) => {
            return place.title.toLowerCase().includes(searchValue.toLowerCase()) || place.country.toLowerCase().includes(searchValue.toLowerCase());
        }) || [];
    }, [placesCtx, searchValue]);

    // function to set the search value
    const handleSearchPlace = useCallback((value: string) => {
        setSearchValue(value);
    }, [])

    // if there are no places, display a message to add new place
    if (placesCtx?.places.length === 0) {
        return <div className={classes.noPlaceContainer}>
            <h3 className={classes.noPlaceTitle}>No places created. Click on this button to add new place to get
                started!
            </h3>
            <Link className={classes.linkButton} to='/new-place'>Add new place</Link>
        </div>
    }

    // if the places are loading, display a loading message
    if (placesCtx?.loading) {
        return <div className="loading">Loading...</div>
    }

    // if there is an error, display an error message
    if (placesCtx?.error) {
        return <div className="error">Error: {placesCtx.error}</div>;
    }

    // render the search bar and the continents container
    return (
        <main className={classes.main}>
            <SearchBar value={searchValue} onSearch={handleSearchPlace}/>
            <ContinentsContainer searchedPlaces={searchedPlaces}/>
        </main>
    )
}

export default Main